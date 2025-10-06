export default function ErrorBox({ message }) {
  if (!message) return null
  return <p role="alert" style={{color:'#ff6b6b'}}>Hiba: {String(message)}</p>
}
