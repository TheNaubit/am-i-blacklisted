import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import usdcABI from '@/lib/abis/usdc-abi.json'
import { useDebounce } from '@/hooks/useDebounce'
import { ETHEREUM_CHAIN_ID, USDC_CONTRACT_ADDRESS } from '@/lib/consts'
import { validateInputAddressOrENS } from '@/lib/validators'
import { IAddressOrENSValidationResult } from 'types'

const BlacklistChecker: FC = () => {
	const [addressToTest, setAddressToTest] = useState('');
    const [showResultBox, setShowResultBox] = useState(false);
    const [showErrorBox, setShowErrorBox] = useState(false);
    const [analyzedObject, setAnalyzedObject] = useState<IAddressOrENSValidationResult>({success: false})
    const debouncedAddressToTest = useDebounce(addressToTest, 100);

	const { data, isLoading, isFetching, isRefetching, refetch } = useContractRead({
		addressOrName: USDC_CONTRACT_ADDRESS,
		contractInterface: usdcABI,
		functionName: 'isBlacklisted',
		args: debouncedAddressToTest,
        chainId: ETHEREUM_CHAIN_ID,
        enabled: false
	})

    const onChanceAddressInput : ChangeEventHandler<HTMLInputElement> = async (e) => {
        if(showResultBox) setShowResultBox(false)
        if(showErrorBox) setShowErrorBox(false)

        setAddressToTest(e.target.value)
    }

    useEffect(() => {
        validateInputAddressOrENS(debouncedAddressToTest)
        .then(validatedResult => {
            if(validatedResult.success) {
                setAnalyzedObject(validatedResult)
                refetch().then(() => setShowResultBox(true))
            }else{
                setShowErrorBox(true)
            }
        })
        .catch(err => {
            // Error validating!
        })
    }, [debouncedAddressToTest, refetch])

    

	return (
		<div className="mt-8 mx-10 md:px-20 px-10 md:py-16 py-10 bg-transparent md:bg-[#e0e0e02d] backdrop-blur-lg overflow-hidden md:shadow md:rounded-2xl grow justify-center">
            {
                showErrorBox && debouncedAddressToTest && (
                    <div className={`bg-red-500 mb-6 px-4 py-6 sm:rounded-lg text-slate-50`}>
                        😥 {debouncedAddressToTest} is not a valid address or ENS!
                    </div>
                )
            }
            {
                showResultBox && (
                    <div className={`${data ? "bg-red-500" : "bg-green-500"} mb-6 px-4 py-6 sm:rounded-lg text-slate-50`}>
                        {
                            data ? `😥 ${analyzedObject.address} ${analyzedObject.ens ? `(${analyzedObject.ens})` : ''} is banned!` :
                            `🎉 ${analyzedObject.address} ${analyzedObject.ens ? `(${analyzedObject.ens})` : ''} is not banned!`
                        }
                    </div>
                )
            }
			{isLoading || isFetching || isRefetching ? (
				<>Loading...</>
			) : (
				<div className="">
					<label
						htmlFor="default-input"
						className="block mb-4 text-xl font-medium text-gray-300"
					>
						What is the wallet you want to check?
					</label>
					<input
						type="text"
						id="default-input"
						placeholder="0x0000000000000000000000000000000000000000"
                        onChange={onChanceAddressInput}
                        value={addressToTest}
						className="text-sm rounded-lg block w-full p-2.5 bg-gray-300 border-gray-600 placeholder-gray-800 text-gray-900 focus:ring-blue-800 focus:border-blue-800"
					/>
				</div>
			)}
		</div>
	)
}

export default BlacklistChecker
