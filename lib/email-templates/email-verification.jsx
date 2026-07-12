export function verifyEmailTemplate({
    otp,
    name = "Developer",
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
            padding:32px 16px;
            background:#f8fafc;
            font-family:Arial,sans-serif;
        "
    >
        <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
        >
            <tr>
                <td align="center">

                    <table
                        width="600"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                            background:#ffffff;
                            border-radius:20px;
                            overflow:hidden;
                            border:1px solid #e5e7eb;
                        "
                    >

                        <tr>
                            <td
                                align="center"
                                style="
                                    padding:32px;
                                    background:linear-gradient(135deg,#4f46e5,#7c3aed);
                                "
                            >
                                <h1
                                    style="
                                        margin:0;
                                        color:white;
                                        font-size:32px;
                                        font-weight:800;
                                    "
                                >
                                    AlgoGrind
                                </h1>

                                <p
                                    style="
                                        margin-top:8px;
                                        color:#e0e7ff;
                                        font-size:14px;
                                    "
                                >
                                    Practice • Learn • Progress
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td
                                style="
                                    padding:40px;
                                    text-align:center;
                                "
                            >
                                <h2
                                    style="
                                        margin:0;
                                        color:#111827;
                                        font-size:28px;
                                    "
                                >
                                    Verify Your Email
                                </h2>

                                <p
                                    style="
                                        margin-top:20px;
                                        color:#4b5563;
                                        font-size:16px;
                                        line-height:1.8;
                                    "
                                >
                                    Hi ${name},
                                    <br /><br />
                                    Welcome to AlgoGrind.
                                    Use the verification code below to
                                    complete your account setup.
                                </p>

                                <div
                                    style="
                                        margin:32px auto;
                                        display:inline-block;
                                        padding:18px 32px;
                                        background:#eef2ff;
                                        border:1px solid #c7d2fe;
                                        border-radius:16px;
                                        font-size:34px;
                                        font-weight:800;
                                        letter-spacing:8px;
                                        color:#4338ca;
                                    "
                                >
                                    ${otp}
                                </div>

                                <p
                                    style="
                                        margin-top:10px;
                                        color:#6b7280;
                                        font-size:14px;
                                    "
                                >
                                    This verification code expires in
                                    <strong>10 minutes</strong>.
                                </p>

                                <p
                                    style="
                                        margin-top:30px;
                                        color:#6b7280;
                                        font-size:14px;
                                        line-height:1.7;
                                    "
                                >
                                    For security reasons, never share this code
                                    with anyone.
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td
                                style="
                                    border-top:1px solid #e5e7eb;
                                    padding:24px;
                                    text-align:center;
                                    color:#6b7280;
                                    font-size:13px;
                                    line-height:1.7;
                                "
                            >
                                If you did not request this email,
                                you can safely ignore it.
                                <br />
                                © 2026 AlgoGrind. All rights reserved.
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}