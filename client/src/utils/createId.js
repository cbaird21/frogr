// Generate unique ID for each entry
const createId = (arr) => {
    // Create id variable for new entry
    let id;

    // If there are any entries in the array already
    if (arr.length) {
        // Create array of all ids currently assigned to each entry
        const ids = arr.map((e) => e.id);

        // Sort array so that highest ID is last
        ids.sort((a, b) => a - b);

        // Store highest number, plus 1, in id variable
        id = ids[ids.length - 1] + 1;
    } else {
        // If array is empty, assign new entry an id of 1
        id = 1;
    }

    return id;
};

export default createId;
