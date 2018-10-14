const uint = require('./uint32')

class Tea {

	constructor () {
		this.delta = 0x9E3779B9
	}

	_charToCode (char = '') {
		return char.charCodeAt(0)
	}

	_codeToChar (code) {
		return String.fromCharCode(code)
	}
	
	// строку в число
	_strToUint (string) {
	  let result = 0
	  for (let i = 0; i < 4; i++) result = uint.or(result, uint.shl(this._charToCode(string[i]), i * 8))
	  return isNaN(result) ? 0 : result
	}

	// число в строку
	_uintToStr (number) {
		let result = ''
		for (let i = 0; i < 4; i++) {
			result += this._codeToChar(uint.and(uint.shr(number, i * 8), 0xFF))
		}
	  return result
	}

	// создание блоков из текста по 64 бит
	_createBlocks (data) {
		let result = []
		for (let i = 0; i < data.length; i += 8) {
			result.push([
				this._strToUint(data.slice(i, i + 4)),
				this._strToUint(data.slice(i + 4, i + 8))
			])
		}
		return result
	}

	// создание 128 битного ключа
	_createKey (key) {
		let parts = [0, 0, 0, 0]
		return parts.map((item, i) => this._strToUint( key.slice(i * 4, (i * 4) + 4)) )
	}

	// кодирование
	_encode (v, k) {
		let delta = uint.def(this.delta)
		let sum = uint.def(0)
		let limit = uint.mul(delta * 32)
		let y = v[0]
		let z = v[1]
		while (sum != limit) {
			sum = uint.add(sum, delta)
			y = uint.add(y, uint.xor(uint.add(uint.shl(z, 4), k[0]), uint.add(z, sum), uint.add(uint.shr(z, 5), k[1])))
			z = uint.add(z, uint.xor(uint.add(uint.shl(y, 4), k[2]), uint.add(y, sum), uint.add(uint.shr(y, 5), k[3])))
		}
		return [y, z]
	}

	// декодирование
	_decode (v, k) {
		let delta = uint.def(this.delta)
		let sum = uint.def(0xC6EF3720)
		let y = v[0]
		let z = v[1]
		while (sum != 0) {
			z = uint.sub(z, uint.xor(uint.add(uint.shl(y, 4), k[2]), uint.add(y, sum), uint.add(uint.shr(y, 5), k[3])))
			y = uint.sub(y, uint.xor(uint.add(uint.shl(z, 4), k[0]), uint.add(z, sum), uint.add(uint.shr(z, 5), k[1])))
			sum = uint.sub(sum, delta)     
		}
		return [y, z]
	}

	// процесс шифровки
	_crypt (pid, data, password) {
		let blocks = this._createBlocks(data)
		let key = this._createKey(password)
		let result = ''
		let processes = [this._encode, this._decode]
		blocks.forEach(block => {
			let parts = processes[pid].call(this, block, key)
			result += this._uintToStr(parts[0]) + this._uintToStr(parts[1])
		})
		return result
	}

	// шифровка
	encrypt (data, password) {
		data = escape(data)
		return this._crypt(0, data, password)
	}

	// расшифровка
	decrypt (data, password) {
		let result = this._crypt(1, data, password)
		return unescape(result).replace(/\0+/g, '')
	}

}

module.exports = Tea