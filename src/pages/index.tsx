import { FC } from 'react'
import { APP_NAME } from '@/lib/consts'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import BlacklistChecker from '@/components/BlacklistChecker'

const Home: FC = () => {

	return (
		<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			<div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
				<div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
					<h1 className="text-5xl text-center px-20 leading-tight font-bold dark:text-white">{APP_NAME}</h1>
				</div>

				<BlacklistChecker />

				<div className="flex justify-center mt-4 mx-10 md:px-10 px-10 sm:items-center sm:justify-between">
					<div className="text-center text-sm text-gray-500 sm:text-left">
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
	)
}

export default Home
