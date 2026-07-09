export function verifyEmailTemplate({
    otp,
    name = "Developer",
    title = "Verify Your Email",
    description = "Use the verification code below to complete your AlgoGrind account setup.",
}) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email</title>
    </head>
    <body
        style="
            margin:0;
            padding:40px 20px;
            background:#f4f4f5;
            font-family:Inter,Arial,sans-serif;
        "
    >
        <div
            style="
                max-width:600px;
                margin:auto;
                background:#ffffff;
                border-radius:24px;
                overflow:hidden;
                box-shadow:0 10px 30px rgba(0,0,0,0.06);
            "
        >

            <div
                style="
                    background:#f8fafc;
                    padding:40px;
                    text-align:center;
                "
            >
                <h2
                    style="
                        margin:0;
                        color:#4f46e5;
                        font-size:28px;
                        font-weight:800;
                    "
                >
                    AlgoGrind
                </h2>
            </div>

            <div
                style="
                    padding:48px 40px;
                    text-align:center;
                "
            >
                <div
                    style="
                        font-size:64px;
                        margin-bottom:20px;
                    "
                >
                    ${emoji}
                </div>

                <h1
                    style="
                        margin:0;
                        font-size:36px;
                        font-weight:800;
                        color:#18181b;
                    "
                >
                    ${title}
                </h1>

                <p
                    style="
                        margin-top:18px;
                        color:#52525b;
                        font-size:16px;
                        line-height:1.7;
                    "
                >
                    Hi ${name},
                    <br /><br />
                    ${description}
                </p>

                <div
                    style="
                        margin:36px auto;
                        width:max-content;
                        background:#eef2ff;
                        border:2px solid #c7d2fe;
                        border-radius:18px;
                        padding:20px 32px;
                        color:#4338ca;
                        font-size:36px;
                        font-weight:800;
                        letter-spacing:10px;
                    "
                >
                    ${otp}
                </div>

                <p
                    style="
                        color:#71717a;
                        font-size:15px;
                    "
                >
                    This code will expire in
                    <strong>10 minutes</strong>.
                </p>
            </div>

            <div
                style="
                    border-top:1px solid #e4e4e7;
                    padding:24px;
                    text-align:center;
                    color:#71717a;
                    font-size:14px;
                    line-height:1.7;
                "
            >
                If you didn't request this email,
                you can safely ignore it.
            </div>

        </div>
    </body>
    </html>
    `;
}