export default function NotFound() {
  return (
    <div style={{
      margin: '5rem 1rem 0 1rem',
      padding: '1rem',
      borderRadius: '0.875rem',
      backgroundColor: 'var(--color3)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '0.5rem',
      maxWidth: '72rem',
      minHeight: '10rem',
      alignSelf: 'center',

      }}>
      <h2 style={{ textAlign: 'center'}}>Oops! Product or page that you are looking for does not exist</h2>
      <p style={{ textAlign: 'center'}}>This could happen due to internal error or wrong request</p>
    </div>
  );
}
