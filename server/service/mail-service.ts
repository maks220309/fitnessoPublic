import nodemailer, { Transporter } from 'nodemailer';

class MailService {
	transporter: Transporter;
	constructor() {
		const hostC: string = process.env.SMTP_HOST || 'default_HOST';
		const portC: number = parseInt(process.env.SMTP_PORT || 'default_PORT', 10); // Парсим строку в число
		const user: string = process.env.SMTP_USER || 'default_USER';
		const password: string = process.env.SMTP_PASSWORD || 'default_PASSWORD';

		this.transporter = nodemailer.createTransport({
			host: hostC,
			port: portC,
			secure: false,
			auth: {
				user: user,
				pass: password
			}
		});
	}

	async sendActivationMail(to: string, link: string) {
		const user: string = process.env.SMTP_USER || 'default_USER';
		const CLIENT_URL: string = process.env.CLIENT_URL || 'default_URL';

		const html: string = `<!DOCTYPE html>
		<html lang="en">
		
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Активация</title>
			<style>
				body {
					font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
					background-color: #1a1a1a;
					margin: 0;
					padding: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100vh;
					color: #fff;
				}
		
				.activation-container {
					background-color: #333;
					border: 1px solid #555;
					padding: 30px;
					border-radius: 8px;
					box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
					text-align: center;
				}
		
				.activation-text {
					font-size: 20px;
					margin-bottom: 30px;
					color: #ccc;
				}
		
				.activation-link {
					display: inline-block;
					background-color: #975a0f;
					/* Изменил цвет кнопки на яркий оранжевый */
					color: #cfcfcf;
					text-decoration: none;
					padding: 15px 30px;
					font-size: 18px;
					border-radius: 5px;
					transition: background-color 0.3s ease;
				}
		
				.activation-link:hover {
					background-color: #b36601;
					color: #fff;
					/* Темнее оранжевый при наведении */
				}
			</style>
		</head>
		
		<body>
		
			<div class="activation-container">
				<p class="activation-text">Добро пожаловать! Нажмите на ссылку ниже для активации:</p>
				<a href="${link}">
					<div class="activation-link">
						Активировать
					</div>
				</a>
			</div>
		
		</body>
		
		</html>`;
		await this.transporter.sendMail({
			from: user,
			to,
			subject: `Активация аккаунта ${CLIENT_URL}`,
			html: html
		});
	}
}

export default new MailService();
