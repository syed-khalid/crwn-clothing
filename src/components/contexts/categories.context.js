import React, { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.js";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();

			setCategoriesMap(categoryMap);
		};
		getCategoriesMap();
	}, []);

	const value = { categoriesMap, setCategoriesMap };

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};