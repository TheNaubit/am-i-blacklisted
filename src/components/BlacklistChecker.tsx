import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import ConnectWallet from './ConnectWallet'
import usdcABI from '@/lib/abis/usdc-abi.json'
import { useDebounce } from '@/hooks/useDebounce'
import { ETHEREUM_CHAIN_ID, USDC_CONTRACT_ADDRESS } from '@/lib/consts'

const BlacklistChecker: FC = () => {
	const [addressToTest, setAddressToTest] = useState('');
    const [showResultBox, setShowResultBox] = useState(false);
    const [showErrorBox, setShowErrorBox] = useState(false);
    const debouncedAddressToTest = useDebounce(addressToTest, 500);

	const { data, isError, isLoading } = useContractRead({
		addressOrName: USDC_CONTRACT_ADDRESS,
		contractInterface: usdcABI,
		functionName: 'isBlacklisted',
		args: debouncedAddressToTest,
        chainId: ETHEREUM_CHAIN_ID,
	})

	useEffect(() => {
        setShowErrorBox(false);
        if(data !== undefined) setShowResultBox(true);
	}, [data])

    useEffect(() => {
        if(isError && debouncedAddressToTest) setShowErrorBox(true);
    }, [debouncedAddressToTest, isError])

    const onChanceAddressInput : ChangeEventHandler<HTMLInputElement> = (e) => {
        if(showResultBox) setShowResultBox(false);
        if(showErrorBox) setShowErrorBox(false);
        setAddressToTest(e.target.value);
    }

	return (
		<div className="mt-8 mx-10 md:px-20 px-10 md:py-20 py-10 bg-transparent md:bg-[#e0e0e02d] backdrop-blur-lg overflow-hidden md:shadow md:rounded-2xl grow justify-center">
            {
                showErrorBox && (
                    <div className={`bg-red-500 mb-6 px-4 py-6 sm:rounded-lg text-slate-50`}>
                        😥 There was some error, make sure you have MetaMask installed in the browser!
                    </div>
                )
            }
            {
                showResultBox && (
                    <div className={`${data ? "bg-red-500" : "bg-green-500"} mb-6 px-4 py-6 sm:rounded-lg text-slate-50`}>
                        {
                            data ? `😥 ${debouncedAddressToTest} is banned!` :
                            `🎉 ${debouncedAddressToTest} is not banned!`
                        }
                    </div>
                )
            }
			{isLoading ? (
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
						className="text-sm rounded-lg block w-full p-2.5 bg-gray-300 border-gray-600 placeholder-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
			)}
		</div>
	)
}

export default BlacklistChecker
