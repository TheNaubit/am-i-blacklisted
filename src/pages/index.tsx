import { FC } from 'react'
import { APP_NAME } from '@/lib/consts'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import BlacklistChecker from '@/components/BlacklistChecker'

const Home: FC = () => {
	return (
		<div className="relative flex items-top justify-center min-h-screen bg-gray-900 sm:items-center py-4 sm:pt-0 overflow-hidden">
			<div className="h-screen w-screen absolute top-0 left-0 bg-[#843fa0]">
				<div className="h-[120vh] w-[105vw] bg-[#7C336C] blur-[110px] opacity-80 absolute z-2 left-[-10vw] bottom-[-4vh]" />
				<div className="h-[100vh] w-[100vw] bg-[#B3588A] blur-[110px] opacity-80 absolute animate-auroraPlus z-1 rounded-full right-[-4vw] bottom-[-10vh] rotate-0 translate-x-[18vw] translate-y-[18vh]" />
				<div className="h-[110vh] w-[110vw] bg-[#373372] blur-[110px] opacity-80 absolute animate-aurora z-3 rounded-full left-[-8vw] top-[-50vh] rotate-0 translate-x-[16vw] translate-y-[16vh]" />
			</div>
			<div className="absolute top-0 bottom-0 left-0 right-0 h-screen w-screen z-4 flex justify-center items-center">
				<div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
					<div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
						<h1 className="text-5xl text-center px-20 leading-tight font-bold text-white">
							{APP_NAME}
						</h1>
					</div>

					<BlacklistChecker />

					<div className="flex justify-center mt-4 mx-10 md:px-10 px-10 sm:items-center sm:justify-between">
						<div className="text-center text-sm text-gray-200 sm:text-left">
							<div className="flex items-center">
								Made with 🎉 by
								<a href="https://twitter.com/thenaubit" className="ml-1 underline">
									@thenaubit
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
