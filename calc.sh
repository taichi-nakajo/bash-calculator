#!/bin/bash

# 引数の数をチェック
if [ $# -ne 3 ]; then
    echo "error"
    exit 1
fi

# 引数を変数に代入
operator=$1
num1=$2
num2=$3

# 演算を実行
case $operator in
    "+")
        result=$((num1 + num2))
        ;;
    "-")
        result=$((num1 - num2))
        ;;
    "*")
        result=$((num1 * num2))
        ;;
    "/")
        if [ $num2 -eq 0 ]; then
            echo "error"
            exit 1
        fi
        result=$((num1 / num2))
        ;;
    *)
        echo "error"
        exit 1
        ;;
esac

# 結果を出力
echo $result
