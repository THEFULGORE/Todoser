import React from 'react';
import './Header.scss';
const Header = (props) => {
	const logoutEventHandler = () => {
		props.signOut();
	};

	return (
		<div className="header">
			<div className="header__container">
				{props.path ? (
					<h1 className="header__title">{props.path}</h1>
				) : (
					<h1 className="header__title">Home</h1>
				)}
				<div className="header__login"></div>
				<div className="header__info">
					<div className="header__info-text">
						<h3>{props.name}</h3>
						<button onClick={logoutEventHandler} className="header__button">
							<h2 className="header__button-text">Logout</h2>
						</button>
					</div>
					<div className="photo__container">
						<img className="photo__img" src={props.photo} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
