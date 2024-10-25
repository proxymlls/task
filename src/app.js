import renderLoginPage from './pages/login'
import renderAccountsPage from './pages/accounts'
import renderAccountPage from './pages/account'
import renderHistoryPage from './pages/history'
import renderCurrencyPage from './pages/currency'
import renderBanksPage from './pages/banks'

export default function reload(path = '') {
  const origin = location.origin
  const pathname = path ? path : location.pathname

  if (path) {
    history.pushState({}, '', `${origin}${pathname}`)
  }

  if (!localStorage.token) {
    history.pushState({}, '', origin)
    renderLoginPage()
  } else if (pathname === '/accounts') {
    renderAccountsPage()
  } else if (pathname.match(/^\/accounts\/\d+$/)) {
    renderAccountPage(pathname.split('/')[2])
  } else if (pathname.match(/^\/accounts\/\d+\/history$/)) {
    renderHistoryPage(pathname.split('/')[2])
  } else if (pathname === '/currency') {
    renderCurrencyPage()
  } else if (pathname === '/banks') {
    renderBanksPage()
  } else {
    history.pushState({}, '', `${origin}/accounts`)
    renderAccountsPage()
  }
}

export const getAllCurrencies = async () => {
  try {
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching currencies:", error);
    throw error;
  }
};

reload()
