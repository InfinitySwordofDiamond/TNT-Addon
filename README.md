# **TNT Addon**

---

This addon brings in **5 TNTs + 2 Bonus TNTs** with large spherical explosions into Minecraft Bedrock Edition **without** simply setting the explosion power of explosives to 1 billion.  
With the addition of this addon, Bedrock and Mobile players now don't need to feel jealous of all the large destructive TNT mods available exclusively to Java Edition.  

The last 2 bonus TNTs won't have their own textures and will be published in a separate file. Additionally, a **high-end device** should be used when igniting them due to their massive sizes.

---

## **List of TNTs**

<details>
<summary>TNT #1</summary>

**Radius:** 20  
**Render Time:** 0 seconds  

![TNT #1](https://media.forgecdn.net/attachments/1289/520/tnt-1.jpg)

</details>

---

<details>
<summary>TNT #2</summary>

**Radius:** 40  
**Render Time:** 1 second  

![TNT #2](https://media.forgecdn.net/attachments/1289/521/tnt-2.jpg)

</details>

---

<details>
<summary>TNT #3</summary>

**Radius:** 80  
**Render Time:** 3 seconds  

![TNT #3](https://media.forgecdn.net/attachments/1289/522/tnt-3.jpg)

</details>

---

<details>
<summary>TNT #4</summary>

**Radius:** 160  
**Render Time:** 14 seconds  

![TNT #4](https://media.forgecdn.net/attachments/1289/523/tnt-4.jpg)

</details>

---

<details>
<summary>TNT #5</summary>

**Radius:** 320  
**Render Time:** 1 minute 23 seconds  

![TNT #5](https://media.forgecdn.net/attachments/1289/524/tnt-5.jpg)

</details>

---

<details>
<summary>TNT #6</summary>

**Radius:** 640  
**Render Time:** 6 minutes 22 seconds  

![TNT #6](https://media.forgecdn.net/attachments/1289/525/tnt-6.jpg)

</details>

---

<details>
<summary>TNT #7</summary>

**Radius:** 1280  
**Render Time:** 27 minutes 10 seconds  

![TNT #7](https://media.forgecdn.net/attachments/1289/526/tnt-7.jpg)

</details>

---

<details>
<summary>Visualization</summary>

Sizes of all TNT Craters in comparison.

![Visualization](https://media.forgecdn.net/attachments/1289/594/tnt-craters-visualization.png)

</details>

---

## **Notes** :warning: **(Required to Read)**

- **BETA APIS MUST BE TURNED ON IN THE EXPERIMENTAL TAB IN ORDER FOR THIS ADDON TO WORK.**
- The file with 5 TNTs should be used for lower-end and mobile devices because of memory limitations.
- Set render distance to match the TNT crater size (probably unless it's a flat world) or rendering will hang until you're back within range. Recommended to set simulation distance to max.
- All ticking areas will be removed — remember ticking area coordinates and re-add them after using TNTs.
- Rendering will be buggy because it is Bedrock Edition so either wait for the rendering to fix itself or restart the world.
- Due to the massive crater of TNT #7, set render distance to max (96) for fastest results.
- The TNT blocks function a bit differently than the vanilla TNT as placing blocks on their face will not emit any sound, will disappear instead of igniting when burned or destroyed by explosions, and have slightly different igniting mechanics.
- The loading times of the images above are from my end and yours may vary.

---

#### **Planned Additions**
I plan to add one more TNT that allows custom radii which will replace TNT #6 and TNT #7. Similar to my datapack version, I plan to add a TNT Launcher along with the rapid fire setting as well as a configurable list of blocks to be kept / destroyed by the TNTs.

---

#### **Known Issues**
- Because there are no methods to add ticking chunks beside the `runCommand()` function, many issues occur due to the function running asynchronously. For example, the crater of TNT #7 has a few block sticks can appear and the full crater of TNTs must be within the render distance (unless it is a Flat World Type with minimal features) in order to continue processing with less errors.
- I haven't found a method to detect the difference between out of simulation distance vs out of bounds in Old World types so I temporarily fixed this issue in a separate file by directly adding 10 ticking areas that fills in a 256x256 area. Any Old World Types with sizes larger than 256x256 could have potential issues and sometimes using this file could possibly have issues in infinite world types.
- TNT sometimes leaves flowing water/lava despite them not being in the blacklist.

---

## **Video Preview**
[![Video Preview](https://img.youtube.com/vi/R-OVxP7oklY/0.jpg)](https://www.youtube.com/watch?v=R-OVxP7oklY)
