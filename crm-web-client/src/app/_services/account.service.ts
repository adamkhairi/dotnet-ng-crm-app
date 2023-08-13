import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, finalize, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Account} from "@app/_models/account";
import {
    AccountsClient, API_BASE_URL,
    AuthenticateRequest,
    AuthenticateResponse,
    RegisterRequest,
    RevokeTokenRequest,
    VerifyEmailRequest
} from "@app/_helpers/crm-api-client";

const subUrl = `tokens`;


@Injectable({providedIn: 'root'})
export class AccountService {
    private accountSubject: BehaviorSubject<AuthenticateResponse | null>;
    public account: Observable<AuthenticateResponse | null>;
    public baseUrl: string;

    constructor(
        private router: Router,
        private http: HttpClient,
        @Inject(API_BASE_URL) baseUrl: string,
        private apiClient: AccountsClient,
    ) {
        this.accountSubject = new BehaviorSubject<AuthenticateResponse | null>(null);
        this.account = this.accountSubject.asObservable();
        this.baseUrl = `${baseUrl}/api/accounts`;
    }

    public get accountValue() {
        return this.accountSubject.value;
    }

    login(email: string, password: string) {
      debugger
         return this.http.post<any>(`${this.baseUrl}/authenticate`, { email, password }, { withCredentials: true })
        // return this.apiClient.authenticate(<AuthenticateRequest>{email, password})
            .pipe(map(account => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    logout() {
         this.http.post<any>(`${this.baseUrl}/tokens/revoke-token`, {}, {withCredentials: true}).subscribe();
        // this.apiClient.revokeToken(<RevokeTokenRequest>{token: this.accountValue?.jwtToken});
        this.stopRefreshTokenTimer();
        this.accountSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    refreshToken() {
        return this.http.post<any>(`${this.baseUrl}/refresh`, {}, { withCredentials: true })
        // return this.apiClient.refreshToken()
            .pipe(map((account) => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    register(account: RegisterRequest) {
        return this.http.post(`${this.baseUrl}/register`, account);
        // return this.apiClient.register(account);
    }

    verifyEmail(token: string) {
        return this.http.post(`${this.baseUrl}/verify-email`, { token });
        // return this.apiClient.verifyEmail(<VerifyEmailRequest>{token});
    }

    forgotPassword(email: string) {
        return this.http.post(`${this.baseUrl}/forgot-password`, {email});
    }

    validateResetToken(token: string) {
        return this.http.post(`${this.baseUrl}/validate-reset-token`, {token});
    }

    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post(`${this.baseUrl}/reset-password`, {token, password, confirmPassword});
    }

    getAll() {
         return this.http.get<Account[]>(this.baseUrl);
      // return this.apiClient.accountsAll();
    }

    getById(id: string) {
        return this.http.get<Account>(`${this.baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(this.baseUrl, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${this.baseUrl}/${id}`, params)
            .pipe(map((account: any) => {
                // update the current account if it was updated
                if (account.id === this.accountValue?.id) {
                    // publish updated account to subscribers
                    account = {...this.accountValue, ...account};
                    this.accountSubject.next(account);
                }
                return account;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${this.baseUrl}/${id}`)
            .pipe(finalize(() => {
                // auto logout if the logged in account was deleted
                if (id === this.accountValue?.jwtToken)
                    this.logout();
            }));
    }

    // helper methods

    private refreshTokenTimeout?: any;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtBase64 = this.accountValue!.jwtToken!.split('.')[1];
        const jwtToken = JSON.parse(atob(jwtBase64));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
