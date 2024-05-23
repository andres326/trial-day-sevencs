import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.tsx'
import './index.css'
import { store } from './store/index.ts'
import { MapProvider } from './context/map.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<MapProvider>
			<App />
		</MapProvider>
	</Provider>
)
