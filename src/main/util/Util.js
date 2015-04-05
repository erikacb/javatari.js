// Copyright 2015 by Paulo Augusto Peccin. See license.txt distributed with this file.

Util = new function() {

    this.log = function(str) {
        console.log(">> Javatari: " + str);
    };

    this.message = function(str) {
        alert(str);
    };

    this.arraysEqual = function(a, b) {
        var i = a.length;
        if (i !== b.length) return false;
        while (i--) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    };

    this.arrayFill = function(arr, val) {
        var i = arr.length;
        while(i--)
            arr[i] = val;
        return arr;
    };

    this.arrayFillWithArrayClone = function(arr, val) {
        var i = arr.length;
        while(i--)
            arr[i] = val.slice(0);
        return arr;
    };

    this.arrayFillSegment = function(arr, from, to, val) {
        //noinspection UnnecessaryLocalVariableJS
        var i = to;
        while(i-- > from)
            arr[i] = val;
        return arr;
    };

    this.arrayCopy = function(src, srcPos, dest, destPos, length) {
        for (var i = 0; i < length; i++) {
            dest[destPos + i] = src[srcPos + i];
        }
    };

    this.arrayCopyCircularSourceWithStep = function(src, srcPos, srcLength, srcStep, dest, destPos, destLength) {
        var s = srcPos;
        var d = destPos;
        var destEnd = destPos + destLength;
        while (d < destEnd) {
            dest[d] = src[s | 0];   // as integer
            d++;
            s += srcStep;
            if (s >= srcLength) s -= srcLength;
        }
    };

    this.arrayRemove = function(arr, element) {
        var i = arr.indexOf(element);
        if (i < 0) return;
        arr.splice(i, 1);
    };

    this.arrayNthTruthyIndex = function(arr, n) {
        var found = 0;
        for(var i = 0, len = arr.length; i < len; i++) {
            if (arr[i]) found++;
            if (found >= n) return i;
        }
        return -1;
    };

    this.booleanArrayToByteString = function(boos) {
        var str = "";
        for(var i = 0, len = boos.length; i < len; i++)
            str += boos[i] ? "1" : "0";
        return str;
    };

    this.byteStringToBooleanArray = function(str) {
        var boos = [];
        for(var i = 0, n = str.length; i < n; i++)
            boos.push(str.charAt(i) === "1");
        return boos;
    };

    // Only 8 bit values
    this.uInt8ArrayToByteString = function(ints) {
        var str = "";
        for(var i = 0, len = ints.length; i < len; i++)
            str += String.fromCharCode(ints[i] & 0xff);
        return str;
    };

    this.byteStringToUInt8Array = function(str) {
        var ints = [];
        for(var i = 0, len = str.length; i < len; i++)
            ints.push(str.charCodeAt(i) & 0xff);
        return ints;
    };

    // Only 32 bit values
    this.uInt32ArrayToByteString = function(ints) {
        var str = "";
        for(var i = 0, len = ints.length; i < len; i++) {
            var val = ints[i];
            str += String.fromCharCode((val & 0xff000000) >>> 24);
            str += String.fromCharCode((val & 0xff0000) >>> 16);
            str += String.fromCharCode((val & 0xff00) >>> 8);
            str += String.fromCharCode(val & 0xff);
        }
        return str;
    };

    this.byteStringToUInt32Array = function(str) {
        var ints = [];
        for(var i = 0, len = str.length; i < len;)
            ints.push((str.charCodeAt(i++) * (1 << 24)) + (str.charCodeAt(i++) << 16) + (str.charCodeAt(i++) << 8) + str.charCodeAt(i++));
        return ints;
    };

    // Only 8 bit values, inner arrays of the same length
    this.uInt8BiArrayToByteString = function(ints) {
        var str = "";
        for(var a = 0, lenA = ints.length; a < lenA; a++)
            for(var b = 0, lenB = ints[a].length; b < lenB; b++)
                str += String.fromCharCode(ints[a][b] & 0xff);
        return str;
    };

    // only inner arrays of the same length
    this.byteStringToUInt8BiArray = function(str, innerLength) {
        var outer = [];
        for(var a = 0, len = str.length; a < len;) {
            var inner = new Array(innerLength);
            for(var b = 0; b < innerLength; b++)
                inner[b] = str.charCodeAt(a++) & 0xff;
            outer.push(inner);
        }
        return outer;
    };

};

