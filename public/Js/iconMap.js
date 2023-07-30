// Create a new Map instance to store mappings between weather condition codes and weather icons.
export const ICON_MAP = new Map();

// Add a mapping for weather condition code 0 with the weather icon "sun".
ICON_MAP.set(0, "sun");

// Add another mapping for weather condition code 1 with the weather icon "sun".
ICON_MAP.set(1, "sun");

// Convenience function to add multiple mappings for weather condition codes 0 and 1 with the weather icon "sun".
addMapping([0, 1], "sun");

// Add a mapping for weather condition code 2 with the weather icon "cloud-sun".
addMapping([2], "cloud-sun");

// Add a mapping for weather condition code 3 with the weather icon "cloud".
addMapping([3], "cloud");

// Add mappings for weather condition codes 45 and 48 with the weather icon "smog".
addMapping([45, 48], "smog");

// Add mappings for multiple weather condition codes with the weather icon "cloud-showers-heavy".
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], "cloud-showers-heavy");

// Add mappings for weather condition codes 71, 73, 75, 77, 85, and 86 with the weather icon "snowflake".
addMapping([71, 73, 75, 77, 85, 86], "snowflake");

// Add mappings for weather condition codes 95, 96, and 99 with the weather icon "cloud-bolt".
addMapping([95, 96, 99], "cloud-bolt");

// Function to add multiple mappings for the given weather condition codes and the associated weather icon.
function addMapping(values, icon) {
    values.forEach(element => {
        // Set the weather condition code as the key and the weather icon as the value in the ICON_MAP.
        ICON_MAP.set(element, icon);
    });
}
