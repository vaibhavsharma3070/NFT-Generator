const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<>
			<footer className="text-center text-capitalize" style={{color:'white'}}>
				copyright myNFT &copy; {year}
			</footer>
		</>
	);
};

export default Footer;
