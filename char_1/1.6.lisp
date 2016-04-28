#lang racket

( define ( abs x )
  ( cond ( ( > x 0 ) x )
         ( ( = x 0 ) 0 )
         ( ( < x 0 ) ( - x ) ) ) )

( define ( qbrt x )
  ( define ( square x ) ( * x x ) )
  ( define ( qube x ) ( * x x x ) )
  ( define ( qbrt-iter guess )
    ( define (good-enough?)
      ( < ( abs ( - ( qube guess ) x ) ) 0.001 ) )
    ( define ( improve )
      ( / ( + ( / x  ( square guess ) )
          ( * 2 guess) )
         3 ) )
    ( if ( good-enough? )
        guess
        ( qbrt-iter ( improve ) ) ) )
  ( qbrt-iter 1.0 ) )

( qbrt 27 ) ; 3.0000005410641766
