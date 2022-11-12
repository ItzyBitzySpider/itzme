import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import io from 'socket.io-client';

export default function ExternalApp({ ip }) {
	const [option, setOption] = useState('');
	const [info, setInfo] = useState({
		option: option,
		callbackURL: 'ws://' + ip + ':3000',
	});
	const [callback, setCallback] = useState('');
	const [chainData, setChainData] = useState('');
	const [decrypted, setDecrypted] = useState('');

	useEffect(() => {
		fetch('/api/socket').finally(() => {
			const socket = io();

			socket.on('connect', () => {
				console.log('connect');
				socket.emit('hello');
			});

			socket.on('a user connected', () => {
				console.log('a user connected');
			});

			socket.on('keys', async (msg) => {
				// console.log(msg);
				setCallback(JSON.stringify(msg));
				console.log(msg);
				const blockData = await fetch(
					'http://143.198.209.169:3000/getData?blockNo=' + msg.txNo
				);
				const json = await blockData.json();
				setChainData(JSON.stringify(json));

				//post to /api/decrypt
				const decrypt = await fetch('/api/decrypt', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						encryptedData: json.data.data,
						privateKey: msg.privateKey,
					}),
				});
				const result = await decrypt.json();
				setDecrypted(result);
			});

			socket.on('disconnect', () => {
				console.log('disconnect');
			});
		});
	}, []);

	return (
		<div className='h-screen w-screen flex flex-col justify-center items-center bg-slate-800'>
			<h1 className='text-6xl font-medium text-orange-500'>Wannabe Web App</h1>
			<p className='text-2xl p-5 text-slate-300'>
				Example web application to demonstrate authentication flow.
			</p>
			<div className='h-2/3 flex flex-row w-screen'>
				{callback === '' && (
					<>
						<form className='h-full w-full flex flex-col items-center justify-center'>
							<div>
								<div className='w-50 text-4xl  text-white flex items-center p-5'>
									<input
										className='w-6 h-6 rounded-lg mr-5'
										type='radio'
										checked={option === 'Name'}
										onChange={() => {
											setOption('Name');
											setInfo({
												option: 'Name',
												callbackURL: 'ws://' + ip + ':3000',
											});
										}}
										value='Name'
										name='Name'
									/>
									<p>Name</p>
								</div>
								<div className='w-50 text-4xl  text-white flex items-center p-5'>
									<input
										className='w-6 h-6 rounded-lg mr-5'
										type='radio'
										checked={option === 'Email'}
										onChange={() => {
											setOption('Email');
											setInfo({
												option: 'Email',
												callbackURL: 'ws://' + ip + ':3000',
											});
										}}
										value='Email'
										name='Email'
									/>
									Email
								</div>
								<div className='w-50 text-4xl  text-white flex items-center p-5'>
									<input
										className='w-6 h-6 rounded-lg mr-5'
										type='radio'
										checked={option === 'NRIC'}
										onChange={() => {
											setOption('NRIC');
											setInfo({
												option: 'NRIC',
												callbackURL: 'ws://' + ip + ':3000',
											});
										}}
										value='NRIC'
										name='NRIC'
									/>
									NRIC
								</div>
							</div>
						</form>
						<div className='h-full w-full flex flex-col justify-center items-center'>
							<div className='bg-white p-4'>
								<QRCode size={512} value={JSON.stringify(info)} />
							</div>
							<p className='mt-10 text-2xl text-white'>
								{JSON.stringify(info)}
							</p>
						</div>
					</>
				)}
				{callback !== '' && (
					<>
						<div className='h-full w-full flex flex-col items-center justify-center'>
							<p className='text-2xl text-orange-500 font-bold'>
								From Mobile App
							</p>
							<textarea
								rows={30}
								cols={50}
								className='rounded-2xl p-4 mt-5'
								value={callback}
								readOnly
							/>
						</div>
						<div className='h-full w-full flex flex-col items-center justify-center'>
							<p className='text-2xl text-orange-500 font-bold'>
								Data from Blockchain
							</p>
							<textarea
								rows={30}
								cols={50}
								className='rounded-2xl p-4 mt-5'
								value={chainData}
								readOnly
							/>
						</div>
						<div className='h-full w-full flex flex-col items-center justify-center'>
							<p className='text-2xl text-orange-500 font-bold'>
								Decrypted Data
							</p>
							<textarea
								rows={30}
								cols={50}
								className='rounded-2xl p-4 mt-5 overflow-hidden'
								value={decrypted}
								readOnly
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

//nextjs serverside props
export async function getServerSideProps(context) {
	//get ip from gelocation api
	const res = await fetch('https://api.ipify.org?format=json');
	const json = await res.json();
	const ip = json.ip;
	return {
		props: { ip }, // will be passed to the page component as props
	};
}
