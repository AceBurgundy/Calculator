export default function toast(message) {
  const container = document.createElement('div');
  container.className = 'toast'
  container.textContent = message;

  const list = document.getElementById('toast-list');
  list.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 1000);
}