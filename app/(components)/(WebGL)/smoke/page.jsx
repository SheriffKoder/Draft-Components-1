"use client"
import {particles} from "@/app/(components)/(WebGL)/smoke/smoke"
// import Footer from "@/components/footer";
import Nav from "../../(UI)/PortfolioHeader/Nav";
// import {GUIFunction} from "@/app/cstThree/smoke/dat.gui.min.js"
import { useEffect, useRef, useState } from "react";

import classes from "./page.module.css";

// cross screen animation
let obj2 = [
  {
      "pox": 0,
      "poy": 158,
      "total": 2258
  },
  {
      "pox": 0,
      "poy": 158,
      "total": 2258.60000000149
  },
  {
      "pox": 29,
      "poy": 150,
      "total": 2301.800000000745
  },
  {
      "pox": 35,
      "poy": 149,
      "total": 2302.4000000003725
  },
  {
      "pox": 41,
      "poy": 147,
      "total": 2310.7000000011176
  },
  {
      "pox": 47,
      "poy": 145,
      "total": 2317.5
  },
  {
      "pox": 53,
      "poy": 144,
      "total": 2326.4000000003725
  },
  {
      "pox": 58,
      "poy": 142,
      "total": 2333.9000000003725
  },
  {
      "pox": 63,
      "poy": 141,
      "total": 2341.800000000745
  },
  {
      "pox": 69,
      "poy": 140,
      "total": 2350
  },
  {
      "pox": 74,
      "poy": 138,
      "total": 2358.4000000003725
  },
  {
      "pox": 79,
      "poy": 137,
      "total": 2366.800000000745
  },
  {
      "pox": 83,
      "poy": 137,
      "total": 2374
  },
  {
      "pox": 87,
      "poy": 135,
      "total": 2381.9000000003725
  },
  {
      "pox": 92,
      "poy": 135,
      "total": 2389.9000000003725
  },
  {
      "pox": 96,
      "poy": 135,
      "total": 2398.9000000003725
  },
  {
      "pox": 101,
      "poy": 135,
      "total": 2405.9000000003725
  },
  {
      "pox": 106,
      "poy": 134,
      "total": 2413.800000000745
  },
  {
      "pox": 111,
      "poy": 134,
      "total": 2422
  },
  {
      "pox": 116,
      "poy": 134,
      "total": 2430.7000000011176
  },
  {
      "pox": 120,
      "poy": 134,
      "total": 2438.300000000745
  },
  {
      "pox": 125,
      "poy": 134,
      "total": 2445.4000000003725
  },
  {
      "pox": 128,
      "poy": 134,
      "total": 2454.300000000745
  },
  {
      "pox": 132,
      "poy": 134,
      "total": 2463
  },
  {
      "pox": 136,
      "poy": 134,
      "total": 2470
  },
  {
      "pox": 141,
      "poy": 134,
      "total": 2477.800000000745
  },
  {
      "pox": 146,
      "poy": 134,
      "total": 2485.800000000745
  },
  {
      "pox": 151,
      "poy": 136,
      "total": 2494.300000000745
  },
  {
      "pox": 157,
      "poy": 137,
      "total": 2502.10000000149
  },
  {
      "pox": 165,
      "poy": 139,
      "total": 2510.2000000011176
  },
  {
      "pox": 171,
      "poy": 140,
      "total": 2518.300000000745
  },
  {
      "pox": 178,
      "poy": 142,
      "total": 2525.5
  },
  {
      "pox": 187,
      "poy": 145,
      "total": 2533.4000000003725
  },
  {
      "pox": 194,
      "poy": 146,
      "total": 2542
  },
  {
      "pox": 201,
      "poy": 148,
      "total": 2550.4000000003725
  },
  {
      "pox": 208,
      "poy": 150,
      "total": 2557.9000000003725
  },
  {
      "pox": 214,
      "poy": 152,
      "total": 2565.7000000011176
  },
  {
      "pox": 220,
      "poy": 154,
      "total": 2574.10000000149
  },
  {
      "pox": 227,
      "poy": 156,
      "total": 2581.5
  },
  {
      "pox": 233,
      "poy": 157,
      "total": 2590.300000000745
  },
  {
      "pox": 240,
      "poy": 159,
      "total": 2598
  },
  {
      "pox": 246,
      "poy": 161,
      "total": 2605.60000000149
  },
  {
      "pox": 252,
      "poy": 163,
      "total": 2614
  },
  {
      "pox": 259,
      "poy": 165,
      "total": 2622.10000000149
  },
  {
      "pox": 265,
      "poy": 168,
      "total": 2630.10000000149
  },
  {
      "pox": 272,
      "poy": 171,
      "total": 2638
  },
  {
      "pox": 279,
      "poy": 173,
      "total": 2646.4000000003725
  },
  {
      "pox": 284,
      "poy": 175,
      "total": 2654.4000000003725
  },
  {
      "pox": 290,
      "poy": 178,
      "total": 2661.9000000003725
  },
  {
      "pox": 297,
      "poy": 180,
      "total": 2670.300000000745
  },
  {
      "pox": 302,
      "poy": 184,
      "total": 2679.2000000011176
  },
  {
      "pox": 308,
      "poy": 187,
      "total": 2685.9000000003725
  },
  {
      "pox": 314,
      "poy": 190,
      "total": 2695.10000000149
  },
  {
      "pox": 343,
      "poy": 202,
      "total": 2747.300000000745
  },
  {
      "pox": 347,
      "poy": 203,
      "total": 2750.10000000149
  },
  {
      "pox": 350,
      "poy": 205,
      "total": 2758.4000000003725
  },
  {
      "pox": 354,
      "poy": 206,
      "total": 2765.4000000003725
  },
  {
      "pox": 357,
      "poy": 208,
      "total": 2774.2000000011176
  },
  {
      "pox": 360,
      "poy": 209,
      "total": 2781.800000000745
  },
  {
      "pox": 364,
      "poy": 211,
      "total": 2790.300000000745
  },
  {
      "pox": 367,
      "poy": 213,
      "total": 2797.5
  },
  {
      "pox": 371,
      "poy": 215,
      "total": 2808.9000000003725
  },
  {
      "pox": 374,
      "poy": 217,
      "total": 2813.5
  },
  {
      "pox": 379,
      "poy": 219,
      "total": 2821.800000000745
  },
  {
      "pox": 382,
      "poy": 221,
      "total": 2829.9000000003725
  },
  {
      "pox": 387,
      "poy": 224,
      "total": 2838.300000000745
  },
  {
      "pox": 390,
      "poy": 227,
      "total": 2846.10000000149
  },
  {
      "pox": 394,
      "poy": 229,
      "total": 2854.7000000011176
  },
  {
      "pox": 398,
      "poy": 232,
      "total": 2861.60000000149
  },
  {
      "pox": 403,
      "poy": 235,
      "total": 2869.5
  },
  {
      "pox": 407,
      "poy": 239,
      "total": 2877.5
  },
  {
      "pox": 411,
      "poy": 242,
      "total": 2886.4000000003725
  },
  {
      "pox": 416,
      "poy": 245,
      "total": 2894.10000000149
  },
  {
      "pox": 421,
      "poy": 249,
      "total": 2901.4000000003725
  },
  {
      "pox": 426,
      "poy": 253,
      "total": 2910.10000000149
  },
  {
      "pox": 430,
      "poy": 256,
      "total": 2917.5
  },
  {
      "pox": 435,
      "poy": 260,
      "total": 2927.9000000003725
  },
  {
      "pox": 440,
      "poy": 264,
      "total": 2934.10000000149
  },
  {
      "pox": 446,
      "poy": 268,
      "total": 2941.7000000011176
  },
  {
      "pox": 452,
      "poy": 273,
      "total": 2949.7000000011176
  },
  {
      "pox": 458,
      "poy": 278,
      "total": 2959.60000000149
  },
  {
      "pox": 463,
      "poy": 283,
      "total": 2965.9000000003725
  },
  {
      "pox": 468,
      "poy": 288,
      "total": 2973.60000000149
  },
  {
      "pox": 473,
      "poy": 293,
      "total": 2982.2000000011176
  },
  {
      "pox": 478,
      "poy": 299,
      "total": 2989.7000000011176
  },
  {
      "pox": 483,
      "poy": 305,
      "total": 2997.800000000745
  },
  {
      "pox": 489,
      "poy": 310,
      "total": 3006.10000000149
  },
  {
      "pox": 494,
      "poy": 315,
      "total": 3014.2000000011176
  },
  {
      "pox": 499,
      "poy": 320,
      "total": 3022.7000000011176
  },
  {
      "pox": 504,
      "poy": 325,
      "total": 3029.9000000003725
  },
  {
      "pox": 508,
      "poy": 330,
      "total": 3038.7000000011176
  },
  {
      "pox": 513,
      "poy": 335,
      "total": 3045.800000000745
  },
  {
      "pox": 518,
      "poy": 341,
      "total": 3053.7000000011176
  },
  {
      "pox": 524,
      "poy": 347,
      "total": 3061.800000000745
  },
  {
      "pox": 530,
      "poy": 354,
      "total": 3069.9000000003725
  },
  {
      "pox": 535,
      "poy": 361,
      "total": 3077.9000000003725
  },
  {
      "pox": 540,
      "poy": 367,
      "total": 3086.10000000149
  },
  {
      "pox": 546,
      "poy": 374,
      "total": 3093.9000000003725
  },
  {
      "pox": 550,
      "poy": 380,
      "total": 3102.60000000149
  },
  {
      "pox": 555,
      "poy": 386,
      "total": 3109.60000000149
  },
  {
      "pox": 559,
      "poy": 392,
      "total": 3118.800000000745
  },
  {
      "pox": 564,
      "poy": 398,
      "total": 3125.60000000149
  },
  {
      "pox": 569,
      "poy": 405,
      "total": 3136
  },
  {
      "pox": 575,
      "poy": 412,
      "total": 3141.800000000745
  },
  {
      "pox": 581,
      "poy": 418,
      "total": 3150.60000000149
  },
  {
      "pox": 586,
      "poy": 425,
      "total": 3158.300000000745
  },
  {
      "pox": 592,
      "poy": 432,
      "total": 3166.2000000011176
  },
  {
      "pox": 598,
      "poy": 441,
      "total": 3174.300000000745
  },
  {
      "pox": 603,
      "poy": 447,
      "total": 3181.7000000011176
  },
  {
      "pox": 608,
      "poy": 454,
      "total": 3190
  },
  {
      "pox": 613,
      "poy": 461,
      "total": 3198.2000000011176
  },
  {
      "pox": 617,
      "poy": 467,
      "total": 3205.9000000003725
  },
  {
      "pox": 622,
      "poy": 474,
      "total": 3213.9000000003725
  },
  {
      "pox": 627,
      "poy": 480,
      "total": 3221.60000000149
  },
  {
      "pox": 631,
      "poy": 486,
      "total": 3229.9000000003725
  },
  {
      "pox": 637,
      "poy": 491,
      "total": 3238.5
  },
  {
      "pox": 640,
      "poy": 497,
      "total": 3245.300000000745
  },
  {
      "pox": 645,
      "poy": 503,
      "total": 3253.5
  },
  {
      "pox": 649,
      "poy": 509,
      "total": 3261.60000000149
  },
  {
      "pox": 654,
      "poy": 515,
      "total": 3270.60000000149
  },
  {
      "pox": 658,
      "poy": 520,
      "total": 3277.7000000011176
  },
  {
      "pox": 662,
      "poy": 526,
      "total": 3285.10000000149
  },
  {
      "pox": 666,
      "poy": 532,
      "total": 3293.4000000003725
  },
  {
      "pox": 670,
      "poy": 538,
      "total": 3301.4000000003725
  },
  {
      "pox": 674,
      "poy": 544,
      "total": 3309.9000000003725
  },
  {
      "pox": 678,
      "poy": 550,
      "total": 3317.300000000745
  },
  {
      "pox": 681,
      "poy": 556,
      "total": 3325.60000000149
  },
  {
      "pox": 685,
      "poy": 561,
      "total": 3334
  },
  {
      "pox": 689,
      "poy": 566,
      "total": 3342.10000000149
  },
  {
      "pox": 693,
      "poy": 571,
      "total": 3350.2000000011176
  },
  {
      "pox": 696,
      "poy": 577,
      "total": 3358.4000000003725
  },
  {
      "pox": 710,
      "poy": 596,
      "total": 3393.9000000003725
  },
  {
      "pox": 714,
      "poy": 601,
      "total": 3398.7000000011176
  },
  {
      "pox": 717,
      "poy": 605,
      "total": 3405.4000000003725
  },
  {
      "pox": 721,
      "poy": 611,
      "total": 3414.5
  },
  {
      "pox": 724,
      "poy": 615,
      "total": 3422.5
  },
  {
      "pox": 727,
      "poy": 619,
      "total": 3430
  },
  {
      "pox": 730,
      "poy": 622,
      "total": 3438.2000000011176
  },
  {
      "pox": 732,
      "poy": 626,
      "total": 3447
  },
  {
      "pox": 736,
      "poy": 630,
      "total": 3454.300000000745
  },
  {
      "pox": 738,
      "poy": 634,
      "total": 3462.9000000003725
  },
  {
      "pox": 741,
      "poy": 638,
      "total": 3469.60000000149
  },
  {
      "pox": 744,
      "poy": 643,
      "total": 3477.60000000149
  },
  {
      "pox": 747,
      "poy": 647,
      "total": 3485.2000000011176
  },
  {
      "pox": 751,
      "poy": 652,
      "total": 3493.300000000745
  },
  {
      "pox": 754,
      "poy": 656,
      "total": 3502
  },
  {
      "pox": 758,
      "poy": 661,
      "total": 3510.60000000149
  },
  {
      "pox": 761,
      "poy": 665,
      "total": 3518
  },
  {
      "pox": 765,
      "poy": 670,
      "total": 3525.60000000149
  },
  {
      "pox": 768,
      "poy": 673,
      "total": 3533.800000000745
  },
  {
      "pox": 771,
      "poy": 676,
      "total": 3542.10000000149
  },
  {
      "pox": 774,
      "poy": 679,
      "total": 3549.9000000003725
  },
  {
      "pox": 776,
      "poy": 682,
      "total": 3558.10000000149
  },
  {
      "pox": 778,
      "poy": 686,
      "total": 3565.9000000003725
  },
  {
      "pox": 781,
      "poy": 688,
      "total": 3574.4000000003725
  },
  {
      "pox": 786,
      "poy": 692,
      "total": 3581.9000000003725
  },
  {
      "pox": 790,
      "poy": 695,
      "total": 3589.5
  },
  {
      "pox": 795,
      "poy": 699,
      "total": 3596.60000000149
  },
  {
      "pox": 800,
      "poy": 702,
      "total": 3605.300000000745
  },
  {
      "pox": 804,
      "poy": 705,
      "total": 3612.300000000745
  },
  {
      "pox": 808,
      "poy": 708,
      "total": 3620.9000000003725
  },
  {
      "pox": 813,
      "poy": 711,
      "total": 3628.7000000011176
  },
  {
      "pox": 817,
      "poy": 714,
      "total": 3636.60000000149
  },
  {
      "pox": 822,
      "poy": 717,
      "total": 3645.7000000011176
  },
  {
      "pox": 826,
      "poy": 719,
      "total": 3653.300000000745
  },
  {
      "pox": 830,
      "poy": 723,
      "total": 3661.800000000745
  },
  {
      "pox": 835,
      "poy": 726,
      "total": 3668.4000000003725
  },
  {
      "pox": 839,
      "poy": 729,
      "total": 3677
  },
  {
      "pox": 844,
      "poy": 733,
      "total": 3684.800000000745
  },
  {
      "pox": 850,
      "poy": 736,
      "total": 3692.800000000745
  },
  {
      "pox": 855,
      "poy": 740,
      "total": 3700.7000000011176
  },
  {
      "pox": 861,
      "poy": 743,
      "total": 3710.10000000149
  },
  {
      "pox": 866,
      "poy": 747,
      "total": 3717.2000000011176
  },
  {
      "pox": 871,
      "poy": 750,
      "total": 3726
  },
  {
      "pox": 876,
      "poy": 753,
      "total": 3733.2000000011176
  },
  {
      "pox": 881,
      "poy": 755,
      "total": 3743.300000000745
  },
  {
      "pox": 884,
      "poy": 757,
      "total": 3748.800000000745
  },
  {
      "pox": 888,
      "poy": 760,
      "total": 3757.800000000745
  },
  {
      "pox": 893,
      "poy": 761,
      "total": 3764.7000000011176
  },
  {
      "pox": 897,
      "poy": 764,
      "total": 3774.10000000149
  },
  {
      "pox": 902,
      "poy": 766,
      "total": 3781.10000000149
  },
  {
      "pox": 907,
      "poy": 768,
      "total": 3789.10000000149
  },
  {
      "pox": 912,
      "poy": 770,
      "total": 3796.7000000011176
  },
  {
      "pox": 917,
      "poy": 772,
      "total": 3805.7000000011176
  },
  {
      "pox": 922,
      "poy": 774,
      "total": 3813.4000000003725
  },
  {
      "pox": 926,
      "poy": 776,
      "total": 3820.9000000003725
  },
  {
      "pox": 930,
      "poy": 778,
      "total": 3829
  },
  {
      "pox": 935,
      "poy": 779,
      "total": 3837.300000000745
  },
  {
      "pox": 939,
      "poy": 781,
      "total": 3845.10000000149
  },
  {
      "pox": 944,
      "poy": 783,
      "total": 3852.5
  },
  {
      "pox": 949,
      "poy": 784,
      "total": 3861.4000000003725
  },
  {
      "pox": 953,
      "poy": 785,
      "total": 3869.4000000003725
  },
  {
      "pox": 957,
      "poy": 786,
      "total": 3876.7000000011176
  },
  {
      "pox": 969,
      "poy": 789,
      "total": 3908.2000000011176
  },
  {
      "pox": 972,
      "poy": 790,
      "total": 3908.60000000149
  },
  {
      "pox": 976,
      "poy": 791,
      "total": 3917.2000000011176
  },
  {
      "pox": 980,
      "poy": 792,
      "total": 3924.9000000003725
  },
  {
      "pox": 984,
      "poy": 793,
      "total": 3932.4000000003725
  },
  {
      "pox": 988,
      "poy": 794,
      "total": 3940.7000000011176
  },
  {
      "pox": 993,
      "poy": 796,
      "total": 3948.5
  },
  {
      "pox": 998,
      "poy": 796,
      "total": 3956.7000000011176
  },
  {
      "pox": 1003,
      "poy": 798,
      "total": 3964.7000000011176
  },
  {
      "pox": 1007,
      "poy": 798,
      "total": 3972.4000000003725
  },
  {
      "pox": 1012,
      "poy": 799,
      "total": 3980.60000000149
  },
  {
      "pox": 1017,
      "poy": 801,
      "total": 3988.9000000003725
  },
  {
      "pox": 1022,
      "poy": 803,
      "total": 3996.7000000011176
  },
  {
      "pox": 1026,
      "poy": 803,
      "total": 4004.300000000745
  },
  {
      "pox": 1030,
      "poy": 804,
      "total": 4012.60000000149
  },
  {
      "pox": 1034,
      "poy": 805,
      "total": 4022
  },
  {
      "pox": 1037,
      "poy": 805,
      "total": 4028.2000000011176
  },
  {
      "pox": 1039,
      "poy": 805,
      "total": 4036.800000000745
  },
  {
      "pox": 1042,
      "poy": 805,
      "total": 4044.5
  },
  {
      "pox": 1044,
      "poy": 806,
      "total": 4052.800000000745
  },
  {
      "pox": 1046,
      "poy": 806,
      "total": 4060.5
  },
  {
      "pox": 1048,
      "poy": 806,
      "total": 4068.800000000745
  },
  {
      "pox": 1050,
      "poy": 806,
      "total": 4077
  },
  {
      "pox": 1053,
      "poy": 806,
      "total": 4084.9000000003725
  },
  {
      "pox": 1055,
      "poy": 806,
      "total": 4093.4000000003725
  },
  {
      "pox": 1058,
      "poy": 806,
      "total": 4100.4000000003725
  },
  {
      "pox": 1060,
      "poy": 806,
      "total": 4108.60000000149
  },
  {
      "pox": 1062,
      "poy": 806,
      "total": 4116.800000000745
  },
  {
      "pox": 1064,
      "poy": 806,
      "total": 4124.60000000149
  },
  {
      "pox": 1067,
      "poy": 806,
      "total": 4133.200000001118
  },
  {
      "pox": 1071,
      "poy": 806,
      "total": 4140.60000000149
  },
  {
      "pox": 1074,
      "poy": 806,
      "total": 4149.10000000149
  },
  {
      "pox": 1077,
      "poy": 806,
      "total": 4158.60000000149
  },
  {
      "pox": 1081,
      "poy": 806,
      "total": 4164.9000000003725
  },
  {
      "pox": 1085,
      "poy": 806,
      "total": 4172.800000000745
  },
  {
      "pox": 1089,
      "poy": 806,
      "total": 4180.800000000745
  },
  {
      "pox": 1092,
      "poy": 806,
      "total": 4188.700000001118
  },
  {
      "pox": 1096,
      "poy": 806,
      "total": 4196.700000001118
  },
  {
      "pox": 1100,
      "poy": 806,
      "total": 4204.5
  },
  {
      "pox": 1104,
      "poy": 806,
      "total": 4212.9000000003725
  },
  {
      "pox": 1109,
      "poy": 806,
      "total": 4221
  },
  {
      "pox": 1112,
      "poy": 806,
      "total": 4228.800000000745
  },
  {
      "pox": 1115,
      "poy": 806,
      "total": 4236.4000000003725
  },
  {
      "pox": 1119,
      "poy": 806,
      "total": 4244.60000000149
  },
  {
      "pox": 1121,
      "poy": 806,
      "total": 4253.10000000149
  },
  {
      "pox": 1123,
      "poy": 805,
      "total": 4261.4000000003725
  },
  {
      "pox": 1125,
      "poy": 804,
      "total": 4269.10000000149
  },
  {
      "pox": 1126,
      "poy": 804,
      "total": 4277.4000000003725
  },
  {
      "pox": 1127,
      "poy": 804,
      "total": 4285.200000001118
  },
  {
      "pox": 1128,
      "poy": 804,
      "total": 4292.5
  },
  {
      "pox": 1130,
      "poy": 803,
      "total": 4300.5
  },
  {
      "pox": 1132,
      "poy": 803,
      "total": 4308.60000000149
  },
  {
      "pox": 1133,
      "poy": 802,
      "total": 4316.4000000003725
  },
  {
      "pox": 1134,
      "poy": 802,
      "total": 4325.300000000745
  },
  {
      "pox": 1135,
      "poy": 802,
      "total": 4332.60000000149
  },
  {
      "pox": 1135,
      "poy": 801,
      "total": 4341.300000000745
  },
  {
      "pox": 1136,
      "poy": 801,
      "total": 4357
  },
  {
      "pox": 1136,
      "poy": 800,
      "total": 4365
  },
  {
      "pox": 1137,
      "poy": 800,
      "total": 4373.300000000745
  },
  {
      "pox": 1138,
      "poy": 800,
      "total": 4404.700000001118
  },
  {
      "pox": 1140,
      "poy": 800,
      "total": 8674.800000000745
  },
  {
      "pox": 1144,
      "poy": 799,
      "total": 8682.300000000745
  },
  {
      "pox": 1151,
      "poy": 797,
      "total": 8694.60000000149
  },
  {
      "pox": 1158,
      "poy": 795,
      "total": 8699.200000001118
  },
  {
      "pox": 1166,
      "poy": 793,
      "total": 8706.5
  },
  {
      "pox": 1174,
      "poy": 791,
      "total": 8714.5
  },
  {
      "pox": 1181,
      "poy": 789,
      "total": 8722.700000001118
  },
  {
      "pox": 1188,
      "poy": 788,
      "total": 8730.700000001118
  },
  {
      "pox": 1194,
      "poy": 787,
      "total": 8738.900000000373
  },
  {
      "pox": 1199,
      "poy": 786,
      "total": 8747.300000000745
  },
  {
      "pox": 1203,
      "poy": 786,
      "total": 8754.5
  },
  {
      "pox": 1207,
      "poy": 785,
      "total": 8763
  },
  {
      "pox": 1211,
      "poy": 785,
      "total": 8771.200000001118
  },
  {
      "pox": 1215,
      "poy": 785,
      "total": 8778.800000000745
  },
  {
      "pox": 1217,
      "poy": 785,
      "total": 8787.800000000745
  },
  {
      "pox": 1220,
      "poy": 785,
      "total": 8794.60000000149
  },
  {
      "pox": 1222,
      "poy": 785,
      "total": 8803
  },
  {
      "pox": 1223,
      "poy": 785,
      "total": 8811.200000001118
  },
  {
      "pox": 1225,
      "poy": 785,
      "total": 8818.5
  },
  {
      "pox": 1226,
      "poy": 785,
      "total": 8826.700000001118
  },
  {
      "pox": 1228,
      "poy": 785,
      "total": 8835.200000001118
  },
  {
      "pox": 1230,
      "poy": 785,
      "total": 8843.10000000149
  },
  {
      "pox": 1231,
      "poy": 785,
      "total": 8859.300000000745
  },
  {
      "pox": 1232,
      "poy": 784,
      "total": 8994.900000000373
  },
  {
      "pox": 1233,
      "poy": 783,
      "total": 9011.60000000149
  },
  {
      "pox": 1234,
      "poy": 781,
      "total": 9019.200000001118
  },
  {
      "pox": 1234,
      "poy": 780,
      "total": 9026.800000000745
  },
  {
      "pox": 1235,
      "poy": 778,
      "total": 9035
  },
  {
      "pox": 1236,
      "poy": 775,
      "total": 9044.700000001118
  }
];

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

function rgb2hsv (r, g, b) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: percentRoundFn(s * 100),
        v: percentRoundFn(v * 100)
    };
}

  // button
  // take a recorded animation and clean its x/y
  // by having stard and end of the animation only not the screen
  // to add on it later the needed screen position in buttonAnim
  const cleanTrack = (objs) => {
    let pox = 0;
    let poy = 0;
    let total = 0;

    let newObj = [];

    for (let i=0; i<objs.length-1; i++) {
      let temp = {pox: objs[i].pox-objs[0].pox,
        poy: objs[i].poy-objs[0].poy,
        total: objs[i].total
      }
      newObj.push(temp);
    }

    console.log(newObj);

  }


function Smoke() {

let myColors = {
    blue: "#4287f5",
    green: "#13edc5",
    red: "#ed1358"
}

    // let cstColor = useRef("#ff0000");
    const [cstColor, setCstColor] = useState("#ffffff");

  // button
  // simulate function in .js file not imported when repeating button animation
  // so import here
  let simulate = (incomingObject, location) => {
    setTimeout(()=> {
        let coordX = 0; // Moving from the left side of the screen
        // let coordY = 500; // Moving in the center
        location === "end" ? coordX = incomingObject.length-1: coordX = 0;

        function move() {
            console.log("moving");
    
            // Move step = 1 array element
            // coordX += 1;
            location === "end" ? coordX -= 1 : coordX += 1;

            console.log("moving1");
            console.log("coordX", coordX);
            // Create new mouse event
            let ev = new MouseEvent("mousemove", {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: incomingObject[coordX].pox,
                clientY: incomingObject[coordX].poy
            });

            console.log("moving2");

        
            // Send event
            document.querySelector('#mainContent').dispatchEvent(ev);

            //make the animation smoother by repeating it again (slight movement)
            let factor
            location === "end" ? factor = -0.3 : factor = 0.3;
            setTimeout(() => {
                let ev2 = new MouseEvent("mousemove", {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: incomingObject[coordX].pox+factor,
                    clientY: incomingObject[coordX].poy+factor
                });
            
                // Send event
                    document.querySelector('#mainContent').dispatchEvent(ev2);
            }, incomingObject[coordX].total/3000);

            console.log("moving3");



            // If the current position of the fake "mouse" is less than the width of the screen - let's move
            // if (coordX < window.innerWidth) {
            // repeat the function again and move to next position
            // with a delay factor from the record simulating user mouse speed delay

            let animaionEnd = false;
            location === "end" ? animaionEnd = (coordX === 0) : animaionEnd = (coordX >= incomingObject.length-1);

            console.log("moving4", animaionEnd);


            if (!animaionEnd) {
                setTimeout(() => {
                    move();
                    //the more speed the faster and less pressure
                }, incomingObject[coordX].total/3000);
            }
      
        }
        
        // Starting to move
        move();
      }, 1000);    
}

  // button
  // object recorded when hovering over a button
  let objClick = [
    {
        "pox": 0,
        "poy": 0,
        "total": 68582.5
    },
    {
        "pox": 0,
        "poy": -3,
        "total": 68590.5
    },
    {
        "pox": 0,
        "poy": -6,
        "total": 68598.40000000037
    },
    {
        "pox": 0,
        "poy": -5,
        "total": 68607.19999999925
    },
    {
        "pox": 0,
        "poy": -7,
        "total": 68614.80000000075
    },
    {
        "pox": 0,
        "poy": -8,
        "total": 68622.80000000075
    },
    {
        "pox": 0,
        "poy": -10,
        "total": 68630.80000000075
    },
    {
        "pox": 0,
        "poy": -11,
        "total": 68639.09999999963
    },
    {
        "pox": 0,
        "poy": -13,
        "total": 68647.19999999925
    },
    {
        "pox": 0,
        "poy": -14,
        "total": 68654.19999999925
    },
    {
        "pox": 0,
        "poy": -16,
        "total": 68663.19999999925
    },
    {
        "pox": 0,
        "poy": -18,
        "total": 68670.30000000075
    },
    {
        "pox": 0,
        "poy": -19,
        "total": 68678.30000000075
    },
    {
        "pox": 0,
        "poy": -20,
        "total": 68687.90000000037
    },
    {
        "pox": 0,
        "poy": -21,
        "total": 68696
    },
    {
        "pox": 0,
        "poy": -23,
        "total": 68702.80000000075
    },
    {
        "pox": 0,
        "poy": -25,
        "total": 68710.09999999963
    },
    {
        "pox": 0,
        "poy": -26,
        "total": 68718.69999999925
    },
    {
        "pox": 0,
        "poy": -28,
        "total": 68727.40000000037
    },
    {
        "pox": 0,
        "poy": -30,
        "total": 68738.90000000037
    },
    {
        "pox": 0,
        "poy": -31,
        "total": 68744.19999999925
    },
    {
        "pox": 0,
        "poy": -32,
        "total": 68750.69999999925
    },
    {
        "pox": 0,
        "poy": -34,
        "total": 68759.40000000037
    },
    {
        "pox": 0,
        "poy": -36,
        "total": 68766.59999999963
    },
    {
        "pox": 0,
        "poy": -37,
        "total": 68775.40000000037
    },
    {
        "pox": 1,
        "poy": -39,
        "total": 68782.80000000075
    },
    {
        "pox": 1,
        "poy": -42,
        "total": 68790.90000000037
    },
    {
        "pox": 2,
        "poy": -44,
        "total": 68798.40000000037
    },
    {
        "pox": 2,
        "poy": -46,
        "total": 68807.90000000037
    },
    {
        "pox": 3,
        "poy": -48,
        "total": 68814.09999999963
    },
    {
        "pox": 3,
        "poy": -50,
        "total": 68822.40000000037
    },
    {
        "pox": 3,
        "poy": -51,
        "total": 68830.5
    },
    {
        "pox": 3,
        "poy": -53,
        "total": 68838.30000000075
    },
    {
        "pox": 3,
        "poy": -55,
        "total": 68879.69999999925
    },
    {
        "pox": 3,
        "poy": -56,
        "total": 68888
    },
    {
        "pox": 4,
        "poy": -56,
        "total": 72509.90000000037
    },
    {
        "pox": 5,
        "poy": -56,
        "total": 72525.5
    },
    {
        "pox": 6,
        "poy": -57,
        "total": 72532.80000000075
    },
    {
        "pox": 7,
        "poy": -57,
        "total": 72545.5
    },
    {
        "pox": 8,
        "poy": -57,
        "total": 72556.69999999925
    },
    {
        "pox": 10,
        "poy": -58,
        "total": 72564.09999999963
    },
    {
        "pox": 12,
        "poy": -59,
        "total": 72580.40000000037
    },
    {
        "pox": 15,
        "poy": -59,
        "total": 72589.5
    },
    {
        "pox": 17,
        "poy": -60,
        "total": 72596.59999999963
    },
    {
        "pox": 22,
        "poy": -61,
        "total": 72605.80000000075
    },
    {
        "pox": 26,
        "poy": -62,
        "total": 72612.19999999925
    },
    {
        "pox": 31,
        "poy": -63,
        "total": 72621.69999999925
    },
    {
        "pox": 37,
        "poy": -64,
        "total": 72628.5
    },
    {
        "pox": 43,
        "poy": -65,
        "total": 72636.30000000075
    },
    {
        "pox": 50,
        "poy": -66,
        "total": 72644.80000000075
    },
    {
        "pox": 59,
        "poy": -67,
        "total": 72653.19999999925
    },
    {
        "pox": 68,
        "poy": -69,
        "total": 72660.59999999963
    },
    {
        "pox": 80,
        "poy": -70,
        "total": 72670.69999999925
    },
    {
        "pox": 94,
        "poy": -71,
        "total": 72676.69999999925
    },
    {
        "pox": 109,
        "poy": -72,
        "total": 72688.19999999925
    },
    {
        "pox": 126,
        "poy": -73,
        "total": 72692.90000000037
    },
    {
        "pox": 146,
        "poy": -74,
        "total": 72700.90000000037
    }
  ]

  // button
  // render again to cause the button animation to be able to repeat
  const [render, setRender] = useState(false);

  // button
  // take a button cleared animation record object and add the viewport to x/y
  // to display on screen 
  const buttonAnim = (e, myObj, id) => {
    console.log(e);

    const element = document.getElementById(`${id}`);

    let width = element.offsetWidth;
    let height = element.offsetHeight;
    
    let screenwidth = e.clientX;
    let screenheight = e.clientY;

    for(let i=0; i<myObj.length-1; i=i+2) {
      myObj[i].pox = myObj[i].pox+(width/2)+screenwidth;
      myObj[i].poy = ((myObj[i].poy)+screenheight);
      myObj[i].total = myObj[i].total / 2000;
    }

    let newObj = [...myObj]

    simulate(newObj, "start");

    console.log(newObj);

  }


  useEffect(()=> {
    const {simulate, multipleSplats} = particles({entry: true, color: "grad", size: "small"});



  },[]);

  return (
    // <>
    <main className="w-[100vw] h-[100vh] relative">
        <Nav/>
      <canvas className="h-full w-full absolute top-0 left-0 z-0"></canvas>
        <section className="h-full w-full absolute top-0 left-0 z-1 overflow-x-hidden overflow-y-scroll" id="mainContent">
            {/* place any elements here */}
            
            <div className={`${classes.firstDiv}`}>
                    <div className={`max-w-[1300px] mx-auto flex items-center justify-center
                    h-[100vh] md2:h-[100vh] w-full gap-9 pt-12 
                    md2:px-12 md2:items-center`}>
                        
                        {/* header */}
                        <div className="flex flex-col md2:flex-row items-center justify-end ">
                            
                            <div className="px-2 md2:flex md2:flex-col md2:items-start md2:min-w-[55%] md2:mb-auto">
                                <h1 className="text-5xl md2:text-start text-center font-semibold gr
                                ">
                                    Your website with a beautiful design
                                </h1>

                                <button type="button" id="mybt" 
                                className="hidden md2:inline
                                px-6 mt-4 py-1 bg-blue-800 
                                font-[300] ml-0
                                rounded-2xl text-sm uppercase"
                                onClick={()=>{console.log("hi"); particles({entry:true, color: "random", size: "small"});}}  
                                onTouchStart={()=>{console.log("hi"); particles({entry:true, color: "random", size: "small"});}}
                                >
                                Try it
                            </button>
                            </div>

                        <p className="font-[100] text-center md2:text-start text-lg
                        px-4">
                            Animations make websites look more modern and gives a nice edge.
                            Animations and transitions can make user interfaces more engaging and intuitive. 
                            They provide visual cues and feedback. 
                            <button type="button" id="mybt" 
                            className="md2:hidden block mx-auto mt-4 px-6 py-1 bg-blue-800 
                            font-[300]
                            rounded-2xl text-sm uppercase"
                            onClick={()=>{console.log("hi"); particles({entry:true, color: "random", size: "small"});}}  
                            onTouchStart={()=>{console.log("hi"); particles({entry:true, color: "random", size: "small"});}}
                            >
                                Try it
                            </button>
                        </p>
                        </div>

                    </div>
            </div>

                    <div className="max-w-[1300px] mx-auto flex flex-col items-center justify-start 
                    h-[40vh] w-full gap-9 md2:gap-4">
                        
                        {/* header */}
                        <h1 className="text-5xl text-center font-semibold gr
                        px-2">
                            Control your animation
                        </h1>

                        <div className="font-[100] text-center text-lg
                        px-4">
                        
                            <p className="max-w-[500px]">
                                You will not only have beautiful animations 
                                but you will also be able to control them. 
                                Try simulating an animation from these buttons 
                            </p>
                            <div className="">
                                <button type="button"
                                className="mx-auto mt-4 w-[6rem] py-1 bg-blue-800 
                                font-[300]
                                rounded-2xl text-sm uppercase"
                                onClick={()=>{        
                                    simulate(obj2, "start");
                                }}  
                                onTouchStart={()=>{
                                    simulate(obj2, "start")
                                }}
                                    
                                >
                                    Play
                                </button>

                                <button type="button"
                                className="ml-2 mx-auto w-[6rem] mt-4 py-1 bg-blue-800 
                                font-[300]
                                rounded-2xl text-sm uppercase"
                                onClick={()=>{simulate(obj2, "end");}}  
                                onTouchStart={()=>{simulate(obj2, "end")}}
                                >
                                    reverse
                                </button>

                            </div>
                        </div>
                        
                    </div>

                    <div className="max-w-[1300px] mx-auto flex flex-col items-center justify-start 
                    h-[40vh] md2:pt-[10vh] w-full gap-9 md2:gap-4 pt-12">
                        
                        {/* header */}
                        <h1 className="text-5xl text-center font-semibold gr
                        px-2">
                            Choose your colors
                        </h1>

                        <div className="font-[100] text-center text-lg
                        px-4 md2:max-w-[500px]">
                            <p>
                                Not only control animations 
                                but you can only edit them.
                                Choose your favorite color from down below
                            </p>

                            <div className="flex flex-row gap-1 my-4 justify-center">
                                <button className={`rounded-full h-8 w-8`}
                                style={{background: `${myColors.red}`}}
                                onClick={()=>{particles({entry:true, color: "red", size: "small"});}}  
                            onTouchStart={()=>{particles({entry:true, color: "red", size: "small"});}}
                                />

                                <button className={`rounded-full h-8 w-8`}
                                style={{background: `${myColors.green}`}}
                                onClick={()=>{particles({entry:true, color: "green", size: "small"});}}  
                            onTouchStart={()=>{particles({entry:true, color: "green", size: "small"});}}
                                />                        
                                <button className={`rounded-full h-8 w-8`}
                                style={{background: `${myColors.blue}`}}
                                onClick={()=>{particles({entry:true, color: "blue", size: "small"});}}  
                            onTouchStart={()=>{console.log("hi"); particles({entry:true, color: "blue", size: "small"});}}
                                /> 

                                <button className={`rounded-full h-8 w-8 bg-gradient-to-r from-[#13edc5] to-[#4287f5] `}
                                
                                onClick={()=>{particles({entry:true, color: "grad", size: "small"});}}  
                            onTouchStart={()=>{console.log("hi"); particles({entry:true, color: "grad", size: "small"});}}
                                />

                                <label htmlFor="color-picker" className={`
                                pt-[2px] cursor-pointer pr-[1px] relative rounded-full h-8 w-8`}
                                style={{background: `${cstColor}`}}
                                // onClick={()=>{particles({entry:true, color: "select"});}}  
                                // onTouchStart={()=>{console.log("hi"); particles({entry:true, color: "select"});}}
                                >&#127912;
                                <input className="opacity-0 absolute top-0 left-0" 
                                type="color" value={cstColor} id="color-picker" 
                                onChange={(e)=>{setCstColor(e.target.value);}}/>
                                </label>         

                                </div>

                                <button type="button" id="mybt" disabled={cstColor !== "#fff" ? false : true}
                                className={`block mx-auto mt-4 px-6 py-1 bg-blue-800 
                                font-[300] ${cstColor !== "#fff" ? 'text-white' : 'text-gray-400'}
                                rounded-2xl text-sm uppercase`}
                                onClick={()=>{
                                    let {r,g,b} = hexToRgb(cstColor);
                                    particles({entry:true, color: "select", rgb:{r,g,b}, size: "small"});
                                
                                }}  
                                // onTouchStart={()=>{console.log("hi"); particles({entry:true});}}
                                >
                                    {cstColor == "#fff" ? 'See in action' : 'Apply Color'}
                                </button>
                        </div>


                    </div>

                    <div className="h-[20vh]"/>

                    {/* <Footer /> */}
       

        </section>
    </main>
    // </>

  );
}

export default Smoke;