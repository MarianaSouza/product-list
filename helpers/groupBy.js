/* Takes an array of objects and the property by which they should be grouped.
Produces an object of arrays keyed by the specified property values.
Provide multiple keys if your data is nested:   groupBy(dogs, 'values', 'emoji')
Ex: [{id: 1, group: 'A'}, {id: 2, group: 'B'}, {id: 3, group: 'A'}],'group'
  =>
{A: [{id: 1, group: 'A'}, {id: 3, group: 'A'}], B: [{id: 2, group: 'B'}]} */
export const groupBy = (data, ...keys) => {
    // Ex: {values: {color: 'red'}}, ['values', 'color'] => 'red'
    const getGroupFromItem = (item, keys) => {
      return keys.length > 1
        ? getGroupFromItem(item[keys[0]], keys.slice(1))
        : item[keys[0]];
    };
  
    return data.reduce(
      (results, item) => {
        // Get the first instance of the key by which we're grouping
        var group = getGroupFromItem(item, keys);
  
        // Ensure that there's an array to hold our results for this group
        results[group] = results[group] || [];
  
        // Add this item to the appropriate group within results
        results[group].push(item);
  
        // Return the updated results object to be passed into next reduce call
        return results;
      },
  
      // Initial value of the results object
      {}
    );
  };