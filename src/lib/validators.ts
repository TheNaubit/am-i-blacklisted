import { ethers } from 'ethers'

export const validateInputAddressOrENS = async (maybeAddressOrENS: string) => {
	let _returnedResult: { success: Boolean; address?: string | undefined; ens?: string | undefined } = {
		success: false,
		address: maybeAddressOrENS,
	}

	const _isAddress = isAddress(maybeAddressOrENS)

	if (_isAddress) {
		_returnedResult.success = true
		_returnedResult.address = maybeAddressOrENS
		_returnedResult.ens = undefined
	} else {
		try {
			const ensAddress = await ethers.getDefaultProvider().resolveName(maybeAddressOrENS)
			if (ensAddress) {
				_returnedResult.success = true
				_returnedResult.address = ensAddress
				_returnedResult.ens = maybeAddressOrENS
			}
		} catch (err) {
			// It is not a valid ENS!
		}
	}

	return _returnedResult
}

export const isAddress = address => {
	try {
		ethers.utils.getAddress(address)
	} catch (e) {
		return false
	}
	return true
}
