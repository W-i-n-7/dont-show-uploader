exports.version = 1.0
exports.apiRequired = 10.3 // api.ctxBelongsTo
exports.description = "Only show file uploader information to allowed users (or no one)"
exports.repo = "W-i-n-7/dont-show-uploader"

exports.config = {
    allowedusers: {
        type: 'username',
        multiple: true,
        label: 'Allowed users'
    }
}

exports.init = async api => ({
    async middleware(ctx) {
        if (ctx.path === '/~/api/get_file_details') {
            var array = api.getConfig('allowedusers');
            if (array && api.ctxBelongsTo(ctx, array)) return;
            return () => {
                if (ctx.body && ctx.body.details) {
                    for (const det of ctx.body.details) {
                        delete det.upload;
                    }
                }
            };
        }
    }
});



