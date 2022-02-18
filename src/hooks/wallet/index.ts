export function useSessionWallet() {  
  const networkId = localStorage.getItem('networkId')
  const wallet = localStorage.getItem('wallet')
  const connectedAccount = localStorage.getItem('connectedAccount')
  const walletNameSuccess = localStorage.getItem('walletNameSuccess');
  
  return {
    networkId,
    wallet,
    connectedAccount,
    walletNameSuccess
  }
}