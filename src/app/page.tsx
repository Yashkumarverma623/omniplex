import styles from "@/styles/Home.module.css";
import MainPrompt from "../components/MainPrompt/MainPrompt";
import CheckoutButton from "../components/Checkout/CheckoutButton";

const Home = () => {
  return (
    <>
      <div className={styles.main}>
        <MainPrompt />
        
      </div>

      <CheckoutButton />
    </>
  );
};

export default Home;
