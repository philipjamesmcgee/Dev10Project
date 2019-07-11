function findMax(testArray) {
	var maxnum=0;
	for(var arrayPosition = 0; arrayPosition<testArray.length; arrayPosition++) {
		var currElem=testArray[arrayPosition];

		
		if(maxnum<currElem){
			maxnum=currElem;
		}
	}
	return maxnum

}
