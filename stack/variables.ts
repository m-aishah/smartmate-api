const envVars: [string, string, string][] = [
  [
    "aws:elasticbeanstalk:application:environment",
    "MAILGUN_API_KEY",
    process.env.MAILGUN_API_KEY
  ],
  [
    "aws:elasticbeanstalk:application:environment",
    "MAILGUN_API_BASE_URL",
    `https://api.eu.mailgun.net`
  ],
  [
    "aws:elasticbeanstalk:application:environment",
    "MAILGUN_DOMAIN",
    `mg.yourdomain.com`
  ],
  [
    "aws:elasticbeanstalk:application:environment",
    "JWT_SECRET",
    process.env.JWT_SECRET
  ],
  [
    "aws:elasticbeanstalk:application:environment",
    "PASSWORD_SALT",
    process.env.PASSWORD_SALT
  ],
  [
    "aws:elasticbeanstalk:application:environment",
    "APP_BASE_URL",
    `https://smartmate-fe.vercel.app`
  ],
  [
    "aws:elasticbeanstalk:application:environment",
    "APP_ENVIRONMENT",
    `PRODUCTION`
  ],
  [
    "aws:elasticbeanstalk:application:environment",
    "SMTP_HOST",
    process.env.SMTP_HOST || ""
  ],
  [
    "aws:elasticbeanstalk:application:environment",
    "SMTP_PORT",
    process.env.SMTP_PORT || ""
  ],
  [
    "aws:elasticbeanstalk:application:environment",
    "SMTP_USER",
    process.env.SMTP_USER || ""
  ],
  [
    "aws:elasticbeanstalk:application:environment",
    "SMTP_PASSWORD",
    process.env.SMTP_PASSWORD || ""
  ],
  ["aws:elasticbeanstalk:application:environment", "npm_config_force", "true"],
  ["aws:elasticbeanstalk:application:environment", "PORT", "8080"]
];

// solution stack https://docs.aws.amazon.com/elasticbeanstalk/latest/platforms/platform-history-nodejs.html
const solutionStackNameFile: string =
  "64bit Amazon Linux 2023 v6.6.7 running Node.js 22";

// this should be a wildcard certificate arn using AWS ACM in the destination region
// *.mydomain.com
const sslArn: string =
  "arn:aws:acm:eu-north-1:418295704099:certificate/4fc99570-6475-460d-ad40-7a34f5aaffca";

const officeIpCode: string = "212.175.253.84/32";

export { envVars, solutionStackNameFile, sslArn, officeIpCode };
