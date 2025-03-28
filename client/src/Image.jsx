export default function Image({ src, ...rest }) {
  // Ensure src is a valid string
  if (typeof src !== 'string') {
    console.error("Invalid src value:", src);
    src = '';
  }

  src = src.startsWith('http') ? src : `http://localhost:4000/uploads/${src}`;

  return <img {...rest} src={src} alt="" />;
}
