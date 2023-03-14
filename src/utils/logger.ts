import * as winston from 'winston';
const format = winston.format;
const { combine, errors, timestamp } = format;


const printNice = format.printf(info => {
	const {level, message} = info;
	return `Logging Level: ${level} - Logging Message: ${message}`;
});

const baseFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  format((info) => {
    info.level = info.level.toUpperCase();
    return info;
  })(),
);

const splunkFormat = combine(
  baseFormat,
  format.json(),
);



const enumerateErrorFormat = format(info => {
	if (info.message instanceof Error) {
		info.message = Object.assign({
			message: `${info.message.message}\n============\n${info.message.stack}`
		}, info.message);
	}

	if (info instanceof Error) {
		return Object.assign({
			message: `${info.message}\n============\n${info.stack}`
		}, info);
	}

	return info;
});

export const logger = winston.createLogger({
	format: format.combine(
		enumerateErrorFormat(),
		format.json()
	),
	transports: [
		// new winston.transports.Console({
		// 	format: splunkFormat
		// }),
    new winston.transports.File({ filename: "logs.log", level: "debug"}),

	]
});


