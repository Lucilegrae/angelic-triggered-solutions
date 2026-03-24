import supabase from '../supabaseClient';

function Contact() {
  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name: 'Prince', message: 'Aura pledge line' }]);

    if (error) {
      console.error(error);
    } else {
      console.log('Submitted:', data);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Your name" />
      <textarea name="message" placeholder="Your message" />
      <button type="submit">Send</button>
    </form>
  );
}

export default Contact;
