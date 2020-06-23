
function statement(invoice, plays) {
	let result = 'Счет для ${invoice.customer}\n';
	for (let perf of invoice.performances) {
		result += ' ${playFor(perf).name}: ${formatRUS(baseAmount(perf))}';
		result += ' (${perf.audience} мест)\n';
	}
	result += 'Итого с вас ${formatRUS(totalAmount())}\n';
	result += 'Вы заработали ${totalVolumeCredits()} бонусов\n';
	return result;

	function baseAmount(perf) {
		let result = 0;
		let audience = perf.audience;
		switch (playFor(perf).type) {
			case "tragedy":
				result = 40000;
				if (audience > 30) {
					result += 1000 * (audience - 30);
				}
				break;
			case "comedy":
				result = 30000;
				if (audience > 20) {
					result += 10000 + 500 * (audience - 20);
				}
				result += 300 * audience;
				break;
			default:
				throw new Error('неизвестный тип: ${play.type}');
		}
		return result;
	}

	function playFor(perf) {
		return plays[perf.playlD];
	}

	function formatRUS(amount) {
		return new Intl.NumberFormat("ru-RU",
			{
				style: "currency", currency: "RUB",
				minimumFractionDigits: 2
			}).format(amount / 100);
	}

	function volumeCreditsFor(perf) {
		let result = 0;
		result += Math.max(perf.audience - 30, 0);
		if ("comedy" === playFor(perf).type)
			result += Math.floor(perf.audience / 5);
		return result
	}

	function totalAmount() {
		let result = 0;
		for (let perf of invoice.performances) {
			result += baseAmount(perf);
		}
		return result;
	}

	function totalVolumeCredits() {
		let result = 0;
		for (let perf of invoice.performances) {
			result += volumeCreditsFor(perf);
		}
		return result;
	}
}
