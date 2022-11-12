import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import io from 'socket.io-client';

export default function ExternalApp({ ip }) {
	const [name, setName] = useState(false);
	const [email, setEmail] = useState(false);
	const [nric, setNric] = useState(false);
	const [info, setInfo] = useState({
		name: false,
		email: false,
		nric: false,
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
			<h1 className='text-6xl text-white'>Wannabe Web App</h1>
			<p className='text-2xl p-5 text-slate-400'>
				Example web application to demonstrate authentication flow.
			</p>
			<button
				className='text-2xl font-medium bg-orange-600 p-3 px-10 rounded-lg  text-white'
				onClick={() => {
					setInfo({ name, email, nric, callbackURL: 'ws://' + ip + ':3000' });
				}}>
				Generate
			</button>
			{callback === '' && <p className=' text-white'>{JSON.stringify(info)}</p>}

			<div className='h-2/3 flex flex-row w-screen'>
				{callback === '' && (
					<>
						<form className='h-full w-full flex flex-col items-center justify-center'>
							<div>
								<div className='w-50 text-4xl  text-white flex items-center p-5'>
									<input
										className='w-6 h-6 rounded-lg mr-5'
										type='checkbox'
										checked={name}
										onChange={() => setName(!name)}
										value='Name'
										name='Name'
									/>
									<p>Name</p>
								</div>
								<div className='w-50 text-4xl  text-white flex items-center p-5'>
									<input
										className='w-6 h-6 rounded-lg mr-5'
										type='checkbox'
										checked={email}
										onChange={() => setEmail(!email)}
										value='Email'
										name='Email'
									/>
									Email
								</div>
								<div className='w-50 text-4xl  text-white flex items-center p-5'>
									<input
										className='w-6 h-6 rounded-lg mr-5'
										type='checkbox'
										checked={nric}
										onChange={() => setNric(!nric)}
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
						</div>
					</>
				)}
				{callback !== '' && (
					<>
						<div className='h-full w-full flex flex-col items-center justify-center'>
							<textarea
								rows={30}
								cols={50}
								className='rounded-2xl p-4 mt-10'
								value={callback}
								readOnly
							/>
						</div>
						<div className='h-full w-full flex flex-col items-center justify-center'>
							<textarea
								rows={30}
								cols={50}
								className='rounded-2xl p-4 mt-10'
								value={chainData}
								readOnly
							/>
						</div>
						<div className='h-full w-full flex flex-col items-center justify-center'>
							<textarea
								rows={30}
								cols={50}
								className='rounded-2xl p-4 mt-10'
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
