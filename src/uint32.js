const uint32 = {

	def(number) {
		return number >>> 0;
	},

	and(number) {
		for (let i = 1; i < arguments.length; i++) {
			number &= arguments[i];
		}
		return this.def(number);
	},

	or(number) {
		for (let i = 1; i < arguments.length; i++) {
			number |= arguments[i];
		}
		return this.def(number);
	},

	xor(number) {
		for (let i = 1; i < arguments.length; i++) {
			number ^= arguments[i];
		}
		return this.def(number);
	},

	not(number) {
		return this.def(~number);
	},

	shl(number, bits) {
		return this.def(number << bits);
	},

	shr(number, bits) {
		return number >>> bits;
	},

	add(number) {
		for (let i = 1; i < arguments.length; i++) {
			number += arguments[i];
		}
		return this.def(number);
	},

	sub(number) {
		for (let i = 1; i < arguments.length; i++) {
			number -= arguments[i];
		}
		return this.def(number);
	},

	mul(number) {
		for (let i = 1; i < arguments.length; i++) {
			number *= arguments[i];
		}
		return this.def(number);
	},

	div(number) {
		for (let i = 1; i < arguments.length; i++) {
			number /= arguments[i];
		}
		return this.def(number);
	}

};

module.exports = uint32;