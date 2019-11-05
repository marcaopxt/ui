import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import tv4 from 'tv4';

import getLanguage from '../lang';
import customFormats from '../customFormats';

export default function useLanguage(options) {
	const { t } = useTranslation();
	useEffect(() => {
		// control the tv4 language here.
		const language = getLanguage(t);
		if (options.language != null) {
			Object.assign(language, options.language);
		}
		tv4.addLanguage('@talend', language);
		tv4.language('@talend');

		// add formats to check
		const allFormats = Object.assign(customFormats(t), options.customFormats);
		tv4.addFormat(allFormats);
	}, []);
}
