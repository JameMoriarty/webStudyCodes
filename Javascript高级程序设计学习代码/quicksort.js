function quicksort(arr,left,right){
	//当数组元素大于等于2个才排序
	if(left<right){
		//定义最左边的为基准元素
		var index = arr[left];
		var i=left,j=right;
		//当数组元素大于2个时才进行交换
		while(i<j){
			//获取左边大于基准元素的值
			while(j>i&&arr[j]>index){
				j--;
			}
			//将值保存在x里
			var x=arr[j];
			//获取右边小于基准元素的值
			while(i<j&&arr[i]<index){
				i++;
			}
			//将i和j位置上的值进行交换
			arr[j]=arr[i];
			arr[i]=x;
			//给j递减，防止i和交换过的j的值继续交换
			j--;
		}
		
		//将左边开始分治
		quicksort(arr,left,i);
		//将右边开始分治
		quicksort(arr,i+1,right);
	}
}
var nums=[5,6,2,4,1,7,3];
quicksort(nums,0,6);
//输出排序后的数组
console.log(nums);