import styles from "../styles/components/Profile.module.css";

export function Profile(){
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/alvarocjesus.png" alt="Álvaro"/>
      <div>
        <strong>Álvaro Coelho Jesus</strong>
        <p>
          <img src="icons/level.svg" alt="Icone de nível"/>
          Level: 1
        </p>
      </div>
    </div>
  )
}