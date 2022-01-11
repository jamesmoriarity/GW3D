import React, { Component, CSSProperties } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { setTimeout } from "timers";
import {gsap} from 'gsap'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Vector2, Vector3 } from "three";
import { pseudoRandomBytes } from "crypto";
