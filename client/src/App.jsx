import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
	return (
		<div>
			<h1>Welcome to red-tetris</h1>
			<p>This is a template generated with reactjs</p>
		</div>
	);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
