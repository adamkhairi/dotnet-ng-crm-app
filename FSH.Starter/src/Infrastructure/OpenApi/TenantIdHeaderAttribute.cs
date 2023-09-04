﻿using FSH.Starter.Shared.Multitenancy;

namespace FSH.Starter.Infrastructure.OpenApi;

public class TenantIdHeaderAttribute : SwaggerHeaderAttribute
{
    public TenantIdHeaderAttribute()
        : base(
            MultitenancyConstants.TenantIdName,
            "Input your tenant Id to access this API",
            "root",
            // string.Empty,
            true)
    {
    }
}
