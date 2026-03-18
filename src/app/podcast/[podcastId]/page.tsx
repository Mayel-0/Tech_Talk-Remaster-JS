export default function DetailsPage() {
  return (
  <main className="containerDetails">
    <div className="podcastDetails">
      <a href="{{.YoutubeURL}}">
        <div className="podcastDetails__image">
          {
            //{{template "LogoPodcast"}}
          }
        </div>
      </a>
      <div className="podcastDetails__info">
        <h2>TITRE</h2>
        {
          //{{.Title}}
        }
        <p><strong>Sortie : </strong></p>
        {
          //{{.FormattedDate}}
        }
        <p><strong>Invités : </strong></p>
        {
          //{{.NameIntervenant}}
        }
        <div className="podcastDetails__description">
          <label><strong>Résumé :</strong></label>
          <p>Description</p>
          {
            //{{.Description}}
          }
        </div>
      </div>
    </div>
    <div className="JustRotateIt">
    </div>
  </main>
  )
}
