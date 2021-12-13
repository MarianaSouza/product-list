import Select from "./Select";
import styles from "../styles/Sidebar.module.css";

const Sidebar = ({
  selectedProduct,
  handleProductFilterChange,
  uniqueProducts,
  selectedState,
  handleStateFilterChange,
  uniqueStates,
  selectedCity,
  handleCityStateFilterChange,
  uniqueCities,
}) => {
  return (
    <div className={styles.sidebar}>
      <p className={styles.sidebar__title}>Filters</p>
      <div className={styles.sidebar__selects}>
        <Select
          value={selectedProduct}
          handleChange={handleProductFilterChange}
          optionLabel="All Products"
          options={uniqueProducts}
        />
        <Select
          value={selectedState}
          handleChange={handleStateFilterChange}
          optionLabel="All States"
          options={uniqueStates}
        />
        <Select
          value={selectedCity}
          handleChange={handleCityStateFilterChange}
          optionLabel="All Cities test"
          options={uniqueCities}
        />
      </div>
    </div>
  );
};

export default Sidebar;
