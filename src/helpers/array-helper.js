export function sortObjectAlphabeticalByKey(objArray, key) {

    return objArray.sort(function(a, b){
        if (a[key] < b[key]) {
            return -1;
          }
          if (a[key] > b[key]) {
            return 1;
          }
          return 0;
    });

}