import { useState, useEffect } from 'react';
export default function ChainFunctions() {
	const [url, setURL] = useState('http://143.198.209.169:3000');
	const [value, setValue] = useState('');
	const [option, setOption] = useState('menu');
	const [blockNo, setBlockNo] = useState(0);
	const [issuer, setIssuer] = useState('');
	const [admin, setAdmin] = useState(false);
	const [field, setField] = useState('');
	const [identity, setIdentity] = useState('');
	const [idResult, setIdResult] = useState('');

	const getBlockData = (blockNo) => {
		fetch(url + '/getData?blockNo=' + blockNo)
			.then((res) => res.json())
			.then((data) => {
				setValue(JSON.stringify(data));
			});
	};

	const createIssuer = (issuer, admin) => {
		fetch(
			url + '/admin/createIssuer?name=' + issuer + '&admin=' + admin.toString()
		)
			.then((res) => res.json())
			.then((data) => {
				setValue(JSON.stringify(data));
			});
	};

	const issueIdentity = (field, identity) => {
		fetch(url + '/admin/issueIdentity?field=' + field + '&value=' + identity)
			.then((res) => res.json())
			.then((data) => {
				setValue(JSON.stringify(data));
			});
	};

	const decryptIdentity = async (jsonString) => {
		const json = JSON.parse(jsonString);

		const block = await fetch(url + '/getData?blockNo=' + json.blockNo);
		const blockData = await block.json();
		const encryptedData = blockData.data.data;

		fetch('/api/decrypt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				encryptedData: encryptedData,
				privateKey: json.privateKey,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setValue(data);
			});
	};

	return (
		<div className='h-screen w-screen flex flex-col justify-center items-center bg-slate-800'>
			<h1 className='text-6xl font-medium text-orange-500'>
				Blockchain Scanner
			</h1>
			<p className='text-2xl p-5 text-slate-300'>
				GUI to interact with blockchain.
			</p>

			<div className='h-2/3 flex flex-row w-screen mt-5'>
				<div className='h-full w-full flex flex-col items-center justify-center'>
						{option === 'menu' && (
							<>
								<div className='flex flex-col'>
									<div className='p-5'>
										<button
											className='text-3xl font-medium p-3 px-10 rounded-lg hover:text-orange-400  text-white'
											onClick={() => {
												setOption('view');
											}}>
											View Blockchain Data &gt;
										</button>
									</div>
									<div className='p-5'>
										<button
											className='text-3xl font-medium p-3 px-10 rounded-lg hover:text-orange-400 text-white'
											onClick={() => {
												setOption('create');
											}}>
											Create Issuer &gt;
										</button>
									</div>
									<div className='p-5'>
										<button
											className='text-3xl font-medium  p-3 px-10 rounded-lg hover:text-orange-400  text-white'
											onClick={() => {
												setOption('issue');
											}}>
											Issue Identity &gt;
										</button>
									</div>
									<div className='p-5'>
										<button
											className='text-3xl font-medium  p-3 px-10 rounded-lg hover:text-orange-400  text-white'
											onClick={() => {
												setOption('decrypt');
											}}>
											Decrypt Identity &gt;
										</button>
									</div>
								</div>
							</>
						)}
						{option === 'view' && (
							<div className='flex flex-col'>
								<p className='text-2xl text-white font-medium py-2'>
									Block Number
								</p>

								<input
									className='w-50 rounded-lg p-3 text-xl'
									onChange={(e) => setBlockNo(e.target.value)}
									value={blockNo}
								/>
								<div className='flex justify-between'>
									<button
										className='text-3xl font-medium mt-10 rounded-lg hover:text-orange-400  text-white'
										onClick={() => {
											setOption('menu');
										}}>
										&lt; Back
									</button>
									<button
										className='text-3xl font-medium mt-10 rounded-lg hover:text-orange-400  text-white'
										onClick={() => {
											getBlockData(blockNo);
										}}>
										Execute &gt;
									</button>
								</div>
							</div>
						)}
						{option === 'create' && (
							<div className='flex flex-col'>
								<p className='text-2xl text-white font-medium py-2'>
									Issuer Name
								</p>
								<input
									className='w-50 rounded-lg p-3 text-xl'
									onChange={(e) => setIssuer(e.target.value)}
									value={issuer}
								/>
								<div className='flex items-center mt-6'>
									<input
										className='w-5 h-5 rounded-lg mr-5'
										type='checkbox'
										onChange={() => setAdmin(!admin)}
										value={admin}
									/>
									<p className='text-2xl text-white font-medium py-2'>Admin</p>
								</div>

								<div className='flex justify-between'>
									<button
										className='text-3xl font-medium mt-10 rounded-lg hover:text-orange-400  text-white'
										onClick={() => {
											setOption('menu');
										}}>
										&lt; Back
									</button>
									<button
										className='text-3xl font-medium mt-10 rounded-lg hover:text-orange-400  text-white'
										onClick={() => {
											createIssuer(issuer, admin);
										}}>
										Execute &gt;
									</button>
								</div>
							</div>
						)}
						{option === 'issue' && (
							<div className='flex flex-col'>
								<p className='text-2xl text-white font-medium py-2'>
									Field Name
								</p>
								<input
									className='w-50 rounded-lg p-3 text-xl'
									onChange={(e) => setField(e.target.value)}
									value={field}
								/>
								<p className='mt-5 text-2xl text-white font-medium py-2'>
									Value
								</p>
								<input
									className='w-50 rounded-lg p-3 text-xl'
									onChange={(e) => setIdentity(e.target.value)}
									value={identity}
								/>
								<div className='flex justify-between'>
									<button
										className='text-3xl font-medium mt-10 rounded-lg hover:text-orange-400  text-white'
										onClick={() => {
											setOption('menu');
										}}>
										&lt; Back
									</button>
									<button
										className='text-3xl font-medium mt-10 rounded-lg hover:text-orange-400  text-white'
										onClick={() => {
											issueIdentity(field, identity);
										}}>
										Execute &gt;
									</button>
								</div>
							</div>
						)}
						{option === 'decrypt' && (
							<div className='flex flex-col w-2/3 h-2/3'>
								<p className='text-2xl text-white font-medium py-2'>
									Response from Blockchain
								</p>
								<textarea
                  rows={28}
                  cols={20}
									className='w-50 rounded-lg p-3 text-xl'
									onChange={(e) => setIdResult(e.target.value)}
									value={idResult}
								/>
								<div className='flex justify-between'>
									<button
										className='text-3xl font-medium mt-10 rounded-lg hover:text-orange-400  text-white'
										onClick={() => {
											setOption('menu');
										}}>
										&lt; Back
									</button>
									<button
										className='text-3xl font-medium mt-10 rounded-lg hover:text-orange-400  text-white'
										onClick={() => {
											decryptIdentity(idResult);
										}}>
										Execute &gt;
									</button>
								</div>
							</div>
						)}
				</div>
				<div className='h-full w-full flex flex-col justify-center items-center'>
					<div className='h-full w-full flex flex-col items-center justify-center'>
						<p className='text-3xl text-orange-400 font-semibold'>Result</p>
						<textarea
							rows={28}
							cols={75}
							className='rounded-2xl p-4 mt-5'
							value={value}
							readOnly
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
