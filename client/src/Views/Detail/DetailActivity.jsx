import ActivityCard from "./ActivityCard";

const DetailActivity = ({activities, name}) => {
    return (
        <div>
            <h2>{`Activities of ${name}`}</h2>

            <div>
                {activities?.map((a) => (
                    <ActivityCard
                        key={a.id}
                        activity={a}
                    />
                ))}
            </div>
                        
             
           
        </div>
    )
}

export default DetailActivity;

/*

<div className={s.container}>
      <h2 className={s.h2}>{`Actividades de ${name}`}</h2>
      <hr className={s.hr} />
      <div className={s.cardsContainer}>
     LOADER
        {activities?.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
*//** */