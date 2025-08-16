# **TNT Addon**

---

This addon brings in **5 TNTs + 2 Bonus TNTs** with large spherical explosions into Minecraft Bedrock Edition **without** simply setting the explosion power of explosives to 1 billion.  
With the addition of this addon, Bedrock and Mobile players now don't need to feel jealous of all the large destructive TNT mods available exclusively to Java Edition.  

The last 2 bonus TNTs won't have their own textures and will be published in a separate file. Additionally, a **high-end device** should be used when igniting them due to their massive sizes.

---

## **List of TNTs**

<details>
<summary>**TNT #1**</summary>

**Radius:** 20  
**Render Time:** 0 seconds  

![TNT #1](https://media.forgecdn.net/attachments/1289/520/tnt-1.jpg)

</details>

---

<details>
<summary>**TNT #2**</summary>

**Radius:** 40  
**Render Time:** 1 second  

![TNT #2](https://media.forgecdn.net/attachments/1289/521/tnt-2.jpg)

</details>

---

<details>
<summary>**TNT #3**</summary>

**Radius:** 80  
**Render Time:** 3 seconds  

![TNT #3](https://media.forgecdn.net/attachments/1289/522/tnt-3.jpg)

</details>

---

<details>
<summary>**TNT #4**</summary>

**Radius:** 160  
**Render Time:** 14 seconds  

![TNT #4](https://media.forgecdn.net/attachments/1289/523/tnt-4.jpg)

</details>

---

<details>
<summary>**TNT #5**</summary>

**Radius:** 320  
**Render Time:** 1 minute 23 seconds  

![TNT #5](https://media.forgecdn.net/attachments/1289/524/tnt-5.jpg)

</details>

---

<details>
<summary>**TNT #6**</summary>

**Radius:** 640  
**Render Time:** 6 minutes 22 seconds  

![TNT #6](https://media.forgecdn.net/attachments/1289/525/tnt-6.jpg)

</details>

---

<details>
<summary>**TNT #7**</summary>

**Radius:** 1280  
**Render Time:** 27 minutes 10 seconds  

![TNT #7](https://media.forgecdn.net/attachments/1289/526/tnt-7.jpg)

</details>

---

## **Notes** :warning: **(Required to Read)**

- **BETA APIS MUST BE TURNED ON IN THE EXPERIMENTAL TAB IN ORDER FOR THIS ADDON TO WORK.**
- The file with 5 TNTs should be used for lower-end and mobile devices because of memory limitations.
- Set render distance to match the TNT crater size (probably unless it's a flat world) or rendering will hang until you're back within range. Recommended to set simulation distance to max.
- All ticking areas will be removed — remember ticking area coordinates and re-add them after using TNTs.
- Rendering will be buggy because it is Bedrock Edition so either wait for the rendering to fix itself or restart the world.
- Due to the massive crater of TNT #7, set render distance to max (96) for fastest results.
- The loading times of the images above are from my end and yours may vary.

---

#### **Planned Additions**
- One TNT that allows **custom radii** (will replace TNT #6 and TNT #7)
- TNT Launcher with **rapid fire** setting
- Configurable block blacklist/whitelist for TNT destruction

---

#### **Known Issues**
- No native way to add ticking chunks except `runCommand()` — causes async issues, e.g., TNT #7 may leave small block artifacts.
- Full craters must be inside render distance to avoid errors (unless in flat worlds).
- In Old World types, detection between "out of simulation distance" vs "out of bounds" is not perfect.  
  Temporary fix: a file that adds 10 ticking areas to cover a **256x256 area**.  
  Worlds larger than 256x256 or infinite worlds may have issues.
- TNT sometimes leaves flowing water/lava despite them not being in the blacklist.

---

## **Video Preview**
[![Video Preview](https://img.youtube.com/vi/R-OVxP7oklY/0.jpg)](https://www.youtube.com/watch?v=R-OVxP7oklY)
