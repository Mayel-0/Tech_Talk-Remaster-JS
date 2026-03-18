export default function ModifyPodcastPage() {
  return(
  <main className="container views">
    <form method="post" action="/podcast/edit?id={{.Id}}" className="data">
      <label>Titre</label>
      <input type="text" name="title" value="{{.Title}}" required/>
      <label>Description</label>
      <input name="description" value="{{.Description}}" required/>
      <label>URL Youtube</label>
      <input type="text" name="youtube_url" value="{{.YoutubeURL}}" required/>
      <label>Name Intervenant</label>
      <input type="text" name="name_intervenant" value="{{.NameIntervenant}}" required/>
      <label>Date</label>
      <input type="date"  name="date" value="{{.DateForInput}}" required/>
      <button type="submit">Enregistre les modifications</button>
    </form>
  </main>
  )
}
