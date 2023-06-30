namespace FSH.Starter.Application.Common.Mailing;

public interface IMailService : ITransientService
{
    Task SendAsync(MailRequest request, CancellationToken ct);
}