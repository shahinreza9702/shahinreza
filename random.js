// function evenOrOdd(num) {
//     if (num % 2 === 0) {
//         return "Odd Number";
//     } else {
//         return "Even Number";
//     }
// }

// console.log(evenOrOdd(7)); // Odd
// console.log(evenOrOdd(12)); // Even

// function findLargest(...num) {
//     let largest = num[0];
//     for (let i = 1; i < num.length; i++) {
//         if (num[i] > largest) {
//             largest = num[i];
//         }
//     }
//     return largest
// }
// console.log(findLargest(10, 25, 15)); // 25

function findSecondLargest(arr){
    let largest = arr[0];
    let secondLargest = arr[1];
    for(let i=1; i < arr.length;i++){
        if(arr[i] > largest){
            secondLargest = largest;
            largest = arr[i];
        }else
        if (arr[i] > secondLargest){
            secondLargest = arr[i];
        }
    }
    return largest + " " + " " + secondLargest;

}
console.log(findSecondLargest([10, 25, 15, 30, 20]));

// function sum(array) {
//     let total = 0;
//     for (let i = 0; i < array.length; i++) {
//         total += array[i];
//     }
//     return total;
// }

// console.log(sum([2, 4, 6, 8]));



// function reverseString(str) {
//     let reversed = "";
//     for (let i = str.length - 1; i >= 0; i--) {
//         reversed += str[i];
//     }
//     return reversed;

// }

// console.log(reverseString("world"));

// function countVowels(str) {
//     let vowels = "aeiou";
//     let count = 0;
//     for (let i = 0; i < str.length; i++) {
//         if (vowels.includes(str[i])) {
//             count++;
//         }
//     }
//     return count;
// }
// console.log(countVowels("hello world"));


// function findSmallest(num) {
//     let smallest = num[0];
//     for (let i = 0; i < num.length; i++) {
//         if (num[i] < smallest) {
//             smallest = num[i];
//         }
//     }
//     return smallest;
// }

// console.log(findSmallest([60, 10, 20, 30, 50]))

// function isPalindrome(str) {
//     let wordReverse = "";
//     for (let i = str.length - 1; i >= 0; i--) {
//         wordReverse += str[i];
//     }
//     if (wordReverse === str) {
//         return true;
//     } else {
//         return false;
//     }
// }
// console.log(isPalindrome("madam"));

// function removeDuplicates(arr) {
//     let numbers = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (!numbers.includes(arr[i])) {
//             numbers.push(arr[i]);
//         }
//     }
//     return numbers;
// }

// console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));

// function fizzBuzz(num) {
//     for (let i = 1; i <= num; i++) {

//         if (i % 3 === 0 && i % 5 === 0) {
//             console.log("FizzBuzz");
//         } else if (i % 3 === 0) {
//             console.log("Fizz");
//         }
//         else if (i % 5 === 0) {
//             console.log("Buzz");
//         } else {
//             console.log(i);
//         }
//     }
// }
// fizzBuzz(100);


// Problem	Result
// Even/Odd	✅
// Find Largest	✅
// Sum	✅
// Reverse String	✅
// Count Vowels	✅
// Find Smallest	✅
// Palindrome	✅
// Remove Duplicates	✅
// FizzBuzz	✅

