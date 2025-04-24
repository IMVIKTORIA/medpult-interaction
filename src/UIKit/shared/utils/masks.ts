/** Маски для полей ввода */

/** Маска дат */
const applyDateMask = (value: string): string => {
	const match = value.match(/(\d{1,2})?\D*(\d{1,2})?\D*(\d{1,4})?/m)?.slice(1)
	if (!match) return ''

	if (Number(match[1]) > 12) match[1] = '12'
	if (match[1]?.length == 2 && Number(match[1]) < 1) match[1] = '01'

	if (match[2]?.length == 4) {
		const lastDayOfMonth = new Date(Number(match[2]), Number(match[1]), 0).getDate()

		if (match[1]?.length == 2) {
			if (Number(match[0]) > lastDayOfMonth) match[0] = lastDayOfMonth.toString()
			if (match[0]?.length == 2 && Number(match[0]) < 1) match[0] = '01'
		}
	}

	value = match.filter((val) => val).join('.') ?? ''
	return value
}

/** Маска чисел с плавающей точкой */
export const applyNumbersMask = (value: string): string => {
	return (
		value
			.match(/\d+[,|\.]?\d*/g)
			?.join('')
			.replace('.', ',') ?? ''
	)
}

/** Привести телефон к форме 79999999999 */
const editPhone = (phone: string) => {    
	const editedPhone = phone.replace(/[\D,\s]/gm, "").replace(/^8/,"7").substring(0,11);

	if(editedPhone.match(/^7/)) {
		return editedPhone;
	}

	return `7${editedPhone}`
}

/** Привести телефон к форме +7 999 999 99 99 */
export const applyPhoneMask = (phone: string) => {
	const editedPhone = editPhone(phone);

	const regionCode = editedPhone.substring(0,1);
	const cityCode = editedPhone.substring(1,4);
	const numberPart1 = editedPhone.substring(4,7);
	const numberPart2 = editedPhone.substring(7,9);
	const numberPart3 = editedPhone.substring(9,11);
	
	// Приведение к форме 7 999 999 99 99
	const joinedParts = [regionCode, cityCode, numberPart1, numberPart2, numberPart3].filter(part => Boolean(part)).join(" ");
	return `+${joinedParts}`
}
export default {
	applyDateMask,
	applyNumbersMask,
}
